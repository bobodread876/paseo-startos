import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.11.2:0',
  releaseNotes: {
    en_US:
      'Initial release for StartOS: Paseo v0.11.2 with the Claude Code, Codex, and OpenCode CLIs preinstalled.',
    es_ES:
      'Lanzamiento inicial para StartOS: Paseo v0.11.2 con los CLI de Claude Code, Codex y OpenCode preinstalados.',
    de_DE:
      'Erstveröffentlichung für StartOS: Paseo v0.11.2 mit vorinstallierten Claude Code-, Codex- und OpenCode-CLIs.',
    pl_PL:
      'Pierwsze wydanie dla StartOS: Paseo v0.11.2 z preinstalowanymi CLI Claude Code, Codex i OpenCode.',
    fr_FR:
      'Version initiale pour StartOS : Paseo v0.11.2 avec les CLI Claude Code, Codex et OpenCode préinstallés.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
