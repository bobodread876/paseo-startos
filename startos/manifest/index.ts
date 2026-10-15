import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'paseo',
  title: 'Paseo',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/bobodread876/paseo-startos',
  upstreamRepo: 'https://github.com/getpaseo/paseo',
  marketingUrl: 'https://paseo.sh',
  donationUrl: 'https://github.com/sponsors/boudra',
  description: { short, long },
  // 'main' is the Paseo home directory (/home/paseo) — daemon state, config,
  // workspaces, and agent credentials. 'startos' holds the package's own
  // store (login password) and is never mounted into the container.
  volumes: ['main', 'startos'],
  images: {
    paseo: {
      source: { dockerBuild: { dockerfile: 'Dockerfile', workdir: '.' } },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
