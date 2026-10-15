import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  password: Value.text({
    name: i18n('Password'),
    description: i18n(
      'The password used to sign in to the Paseo web interface and to connect Paseo clients.',
    ),
    warning: null,
    footnote: null,
    placeholder: null,
    required: true,
    masked: true,
    minLength: 8,
    maxLength: null,
    inputmode: 'text',
    patterns: [],
    default: null,
    generate: { charset: 'a-z,A-Z,0-9', len: 20 },
    immutable: false,
  }),
})

export const setPassword = sdk.Action.withInput(
  'set-password',
  //
  async ({ effects }) => ({
    name: i18n('Set Password'),
    description: i18n(
      'Set the password for Paseo. The password is required to sign in to the web interface and to connect clients.',
    ),
    warning: (await storeJson.read((s) => s.password).const(effects))
      ? i18n('This will replace the current password.')
      : null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  inputSpec,
  // No prefill: never echo the current password back into the form.
  async () => {},
  async ({ effects, input }) => {
    await storeJson.merge(effects, { password: input.password })

    return {
      version: '1' as const,
      title: i18n('Login Credentials'),
      message: i18n(
        'Use this password to sign in to the Paseo web interface and to connect clients. Store it somewhere safe.',
      ),
      result: {
        type: 'single' as const,
        name: i18n('Password'),
        description: null,
        value: input.password,
        masked: true,
        copyable: true,
        qr: false,
        launchable: false,
      },
    }
  },
)
