<p align="center">
  <img src="icon.svg" alt="Paseo Logo" width="21%">
</p>

# Paseo on StartOS

> Everything not listed in this document should behave the same as upstream Paseo.
> If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable. See the Documentation section of
> `instructions.md` for links.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)

## Image and Container Runtime

The image is a **child of the official upstream image**, pinned by tag and digest:
`ghcr.io/getpaseo/paseo:0.11.2`. The Dockerfile adds the coding-agent CLIs Paseo
orchestrates (pinned): `@anthropic-ai/claude-code`, `@openai/codex`,
`opencode-ai`, following the pattern from upstream's `docker/Dockerfile.agents.example`.

Architectures: `x86_64`, `aarch64`.

The daemon runs via the upstream entrypoint (`tini` → `paseo-docker-entrypoint` →
the supervisor entrypoint) with `runAsInit: true` because tini must be PID 1. Paseo runs
as user `paseo` (1000:1000) via the entrypoint's gosu drop. One subcontainer
(`paseo-sub`), one daemon (`primary`).

## Volume and Data Layout

| Volume    | Mountpoint      | Contents                                                              |
| --------- | --------------- | --------------------------------------------------------------------- |
| `main`    | `/home/paseo`   | Paseo home: daemon state, config, logs, workspaces, agent credentials |
| `startos` | _(not mounted)_ | Package-side store (`store.json`); read only by the SDK runtime       |

Do not hand-edit anything under `/home/paseo/.paseo` while the service is running.

## File Models

- `store.json` (on the `startos` volume): `{ password?: string }`: the Paseo login
  password. Written only by the **Set Password** action; read by `main.ts` and
  passed to the daemon as `PASEO_PASSWORD` (Paseo bcrypts it at startup). Never
  mounted into a container.

## Dependencies

None.

## Network Access and Interfaces

One interface: **`ui`** (`type: ui`, HTTP, port 6767): the Paseo web UI, API
(`/api/*`), WebSocket (`/ws`), and MCP (`/mcp/*`) endpoints on a single origin.
`/api/health` is unauthenticated by upstream design.

Paseo validates the HTTP `Host` header; `main.ts` reads the interface's assigned
addresses and exports them to the daemon via `PASEO_HOSTNAMES`, re-running on
address changes. IPs and localhost are allowed by Paseo regardless.

## Installation and First-Run Flow

Install → critical task **Set Password** blocks first start until the user runs
the action → daemon starts with `PASEO_PASSWORD` set. If the store ever loses the
password, the task reappears and the service cannot be considered configured.

First UI visit shows Paseo's **"Connect your computer"** screen. Upstream's
same-origin auto-connect deliberately probes without a password, so with
`PASEO_PASSWORD` set the probe fails closed and the UI asks once per browser:
**Direct connection** → host/port of the served UI address, SSL matching the
address scheme, and the service password. The host then persists and later
visits skip the screen.

## Actions

- **Set Password** (`set-password`): sets/rotates the Paseo password. Warns when
  replacing an existing password. The daemon restarts on rotation (reactive read).
  Safe to re-run; each run overwrites.

## Tasks

- **Set Password** (critical): raised by the `watchCredentials` init whenever the
  store has no password. Clears when a password is set. Idempotent.

## Health Checks

- **Web Interface**: `GET http://127.0.0.1:6767/api/health` (upstream's own
  liveness endpoint). Failure means the daemon is not serving.

## Backups and Restore

Both volumes (`main`, `startos`) are backed up. A restore brings back workspaces,
agent credentials, and the login password. Restoring `main` without `startos`
would lose the password; the critical task then prompts to set a new one.

## Limitations and Differences

- **Relay off by default**: Paseo's optional end-to-end-encrypted relay is not
  enabled. Reach the UI over LAN or your StartOS remote access (StartTunnel).
- **Voice**: local offline speech models are excluded from the container build
  (`ONNXRUNTIME_NODE_INSTALL=skip`); voice uses a configured cloud provider.
- Agent CLIs are baked into the image and pinned; they do not self-update inside
  the container. They are refreshed on package update (see `UPDATING.md`).

---

## Quick Reference for AI Consumers

```yaml
package_id: 'paseo'
image: 'Dockerfile (child of ghcr.io/getpaseo/paseo, digest-pinned)'
architectures: ['x86_64', 'aarch64']
subcontainers: ['paseo-sub']
volumes:
  main: '/home/paseo'
  startos: 'not mounted (SDK-only store)'
file_models: ['store.json { password? }']
startos_managed_env_vars: ['PASEO_PASSWORD', 'PASEO_HOSTNAMES']
dependencies: []
interfaces:
  ui: 'http:6767 (web UI + api + ws + mcp)'
actions: ['set-password']
tasks: ['set-password (critical, when password unset)']
health_checks: ['Web Interface: GET /api/health']
```
