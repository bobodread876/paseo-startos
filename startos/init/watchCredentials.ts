import { setPassword } from '../actions/setPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

// Paseo must not run unauthenticated on a network interface: while the store
// has no password, surface a critical task pointing at the Set Password action.
// The task blocks first start; it clears itself once a password exists.
export const watchCredentials = sdk.setupOnInit(async (effects) => {
  const password = await storeJson.read((s) => s.password).const(effects)

  if (!password) {
    await sdk.action.createOwnTask(effects, setPassword, 'critical', {
      reason: i18n('Set the password before signing in to Paseo'),
    })
  }
})
