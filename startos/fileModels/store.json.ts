import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// StartOS-side state that Paseo's own config has no place for. The password is
// consumed by main.ts as PASEO_PASSWORD (env) at daemon start.
const shape = z.looseObject({
  password: z.string().optional().catch(undefined),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: 'store.json' },
  shape,
)
