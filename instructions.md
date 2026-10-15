# Paseo

Paseo is the agentic development environment: run coding agents (Claude Code, Codex, OpenCode, and more) on this server and drive them from the web interface, a desktop app, or your phone.

## Documentation

- [Paseo docs](https://paseo.sh/docs) — full upstream documentation (configuration, connectivity, providers, CLI).
- [Supported providers](https://paseo.sh/agents) — every coding agent Paseo can orchestrate.
- [Paseo security model](https://paseo.sh/docs/security) — authentication, relay encryption, and remote access.

## What you get on StartOS

- The official Paseo daemon (v0.11.2) serving the full Paseo web UI on the **Web UI** interface.
- The Claude Code, Codex, and OpenCode CLIs preinstalled inside the container, so agents run immediately after you sign them in.
- One persistent data volume (Paseo's home directory) that holds daemon state, workspaces, worktrees, and your agent credentials. StartOS backups capture it.

## Getting set up

1. Before the service will start, StartOS asks you to **set a password** (critical task). Complete it — this password signs you in to the Paseo web UI and protects the daemon from anyone on your network.
2. Open the **Web UI** interface from the service page.
3. Sign in with the password you set.
4. From inside the Paseo UI, sign in to each agent provider you want to use (Claude, Codex, etc.) or configure API keys. Credentials persist across restarts.

## Rotating the password

Use the **Set Password** action again at any time. The service restarts with the new password automatically.

## Notes and limitations

- The Paseo **relay** (optional end-to-end-encrypted remote access via paseo.sh) is off by default. Direct LAN access plus your StartOS remote-access options (e.g. StartTunnel) are the intended way to reach this package.
- Local (offline) voice transcription requires models that are not included in the container build; voice features use your configured provider (e.g. OpenAI) instead. See the [voice docs](https://paseo.sh/docs/voice).
- Everything else behaves exactly like upstream Paseo — follow the upstream docs.
