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
2. Open the **Web UI** interface from the service page. Paseo greets you with a **"Connect your computer"** screen — this is normal. Because the daemon is password-protected, the UI cannot auto-connect; you point it at its own server once per browser:
3. Choose **Direct connection** and enter:
   - **Host / Port** — the same address you opened in your browser (copy the hostname and port from the address bar / the Web UI interface address on the service page).
   - **Use SSL** — enable only if the address starts with `https` (e.g. a clearnet domain); leave off for plain `.local`/LAN addresses.
   - **Password** — the password you set in step 1.
4. Click **Connect**. The connection is remembered by that browser — you land straight in Paseo on future visits.
5. From inside the Paseo UI, sign in to each agent provider you want to use (Claude, Codex, etc.) or configure API keys. Credentials persist across restarts.

## Rotating the password

Use the **Set Password** action again at any time. The service restarts with the new password automatically.

## Notes and limitations

- The Paseo **relay** (optional end-to-end-encrypted remote access via paseo.sh) is off by default. Direct LAN access plus your StartOS remote-access options (e.g. StartTunnel) are the intended way to reach this package.
- Local (offline) voice transcription requires models that are not included in the container build; voice features use your configured provider (e.g. OpenAI) instead. See the [voice docs](https://paseo.sh/docs/voice).
- Everything else behaves exactly like upstream Paseo — follow the upstream docs.
