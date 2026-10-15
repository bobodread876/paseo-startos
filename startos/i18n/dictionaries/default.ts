export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Paseo!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // interfaces.ts
  'The web interface of Paseo': 4,
  'Web UI': 13,
  // actions/setPassword.ts
  Password: 5,
  'The password used to sign in to the Paseo web interface and to connect Paseo clients.': 6,
  'Set Password': 7,
  'Set the password for Paseo. The password is required to sign in to the web interface and to connect clients.': 8,
  'This will replace the current password.': 9,
  'Login Credentials': 10,
  'Use this password to sign in to the Paseo web interface and to connect clients. Store it somewhere safe.': 11,
  // init/watchCredentials.ts
  'Set the password before signing in to Paseo': 12,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
