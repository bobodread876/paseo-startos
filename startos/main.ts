import { i18n } from './i18n'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Paseo!'))

  // Paseo validates the HTTP Host header and rejects requests arriving on
  // unknown hostnames (DNS-rebinding protection). IPs and localhost are always
  // allowed by Paseo; we add every hostname StartOS assigns to the web
  // interface so the UI is reachable under its StartOS addresses. Reading with
  // .const() re-runs setupMain when addresses change.
  const host = await sdk.host.getOwn(effects, 'ui-multi').const()
  const ui = Object.values(host?.bindings ?? {})
    .flatMap((b) => Object.values(b.interfaces))
    .find((i) => i.id === 'ui')
  const hostnames =
    ui?.addressInfo.format('hostname-info').map((h) => h.hostname) ?? []

  const password = await storeJson.read((s) => s.password).const(effects)

  const env: Record<string, string> = {}
  // The daemon hashes PASEO_PASSWORD (bcrypt) at startup; the web UI and all
  // clients authenticate with it. Only /api/health is unauthenticated.
  if (password) env.PASEO_PASSWORD = password
  if (hostnames.length > 0)
    env.PASEO_HOSTNAMES = Array.from(new Set(hostnames)).join(',')

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'paseo' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/home/paseo',
        readonly: false,
      }),
      'paseo-sub',
    ),
    exec: {
      // Upstream image entrypoint: tini -> paseo-docker-entrypoint -> node
      // supervisor-entrypoint.js. tini must run as PID 1.
      command: sdk.useEntrypoint(),
      runAsInit: true,
      env,
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://127.0.0.1:${uiPort}/api/health`,
          {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          },
        ),
      gracePeriod: 15_000,
    },
    requires: [],
  })
})
