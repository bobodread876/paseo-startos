import { sdk } from './sdk'

// 'main' holds all Paseo state and agent credentials (/home/paseo).
// 'startos' holds the StartOS-side store (login password). Both are required
// for a faithful restore.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) => sdk.Backups.ofVolumes('main', 'startos'),
)
