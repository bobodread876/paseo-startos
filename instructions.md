# Paseo

Paseo is the agentic development environment: run coding agents (Claude Code, Codex, OpenCode, and more) on this server and drive them from the web interface, a desktop app, or your phone.

## Documentation

- [Paseo docs](https://paseo.sh/docs): full upstream documentation (configuration, connectivity, providers, CLI).
- [Supported providers](https://paseo.sh/agents): every coding agent Paseo can orchestrate.
- [Paseo security model](https://paseo.sh/docs/security): authentication, relay encryption, and remote access.

## What you get on StartOS

- The official Paseo daemon (v0.11.2) serving the full Paseo web UI on the **Web UI** interface.
- The Claude Code, Codex, and OpenCode CLIs preinstalled inside the container, so agents run immediately after you sign them in.
- One persistent data volume (Paseo's home directory) that holds daemon state, workspaces, worktrees, and your agent credentials. StartOS backups capture it.

## Getting set up

1. Before the service will start, StartOS asks you to **set a password** (critical task). Complete it. This password signs you in to Paseo and protects the daemon from anyone on your network.
2. Open the **Web UI** interface. Paseo greets you with a **"Connect your computer"** screen. This is normal: the daemon is password-protected, so the web app cannot connect on its own and you point it at your own server. This takes a few seconds and is **once per browser** (the connection is remembered afterwards).

   ![Paseo welcome screen: click Direct connection](https://raw.githubusercontent.com/bobodread876/paseo-startos/main/assets/instructions/01-welcome.png)

3. Click **Direct connection** (marker 1 above). A dialog opens:

   ![Direct connection dialog: what to enter in each field](https://raw.githubusercontent.com/bobodread876/paseo-startos/main/assets/instructions/02-direct-connection.png)

   - **Host** (marker 2): type the exact host from your browser's address bar. This is the same address you used to open the Web UI (for example `paseo.your-server.local`, your server's LAN IP, or your clearnet domain). **Not** `localhost`: that would mean the device the browser runs on.
   - **Port** (marker 3): the port shown in the address bar. No port shown means the default: `443` when the address is `https`, `80` when it is `http` (including Tor `.onion` addresses accessed over `http`).
   - **Use SSL** (marker 4): enable only when the address is `https` (e.g. a clearnet domain). Leave it off for `.local`, plain IP addresses, and `.onion`.
   - **Password** (marker 5): the password you set in step 1.
   - Click **Connect** (marker 6).

4. You land in the Paseo app:

   ![Paseo home after a successful connection](https://raw.githubusercontent.com/bobodread876/paseo-startos/main/assets/instructions/03-connected.png)

5. From inside the Paseo UI, sign in to each agent provider you want to use (Claude, Codex, etc.) or configure API keys. Credentials persist across restarts.

## Rotating the password

Use the **Set Password** action again at any time. The service restarts with the new password automatically.

## Notes and limitations

- The Paseo **relay** (optional end-to-end-encrypted remote access via paseo.sh) is off by default. Direct LAN access plus your StartOS remote-access options (e.g. StartTunnel) are the intended way to reach this package.
- Local (offline) voice transcription requires models that are not included in the container build; voice features use your configured provider (e.g. OpenAI) instead. See the [voice docs](https://paseo.sh/docs/voice).
- Everything else behaves exactly like upstream Paseo; follow the upstream docs.
