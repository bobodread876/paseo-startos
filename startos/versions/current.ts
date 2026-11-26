import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.17.5:0',
  releaseNotes: {
    en_US:
      'Updates Paseo to 0.17.5 and refreshes the bundled Claude Code, Codex and OpenCode clients.',
    es_ES:
      'Actualiza Paseo a 0.17.5 y los clientes Claude Code, Codex y OpenCode incluidos.',
    de_DE:
      'Aktualisiert Paseo auf 0.17.5 und die mitgelieferten Clients für Claude Code, Codex und OpenCode.',
    pl_PL:
      'Aktualizuje Paseo do 0.17.5 oraz dołączone klienty Claude Code, Codex i OpenCode.',
    fr_FR:
      'Met à jour Paseo vers la version 0.17.5 et les clients Claude Code, Codex et OpenCode inclus.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
