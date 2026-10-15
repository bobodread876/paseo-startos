# Updating the upstream version

Upstream is the official Paseo Docker image, pinned by tag **and** digest in
`Dockerfile` (`FROM ghcr.io/getpaseo/paseo:<version>@<digest>`). Paseo releases
as semver git tags `vX.Y.Z`; the matching Docker tag drops the `v`.

## Determining the upstream version

Latest stable:

```sh
gh release view -R getpaseo/paseo --json tagName -q .tagName   # e.g. v0.11.2
```

The image tag is that value without the `v` prefix. Fetch its multi-arch digest:

```sh
docker buildx imagetools inspect ghcr.io/getpaseo/paseo:<version> --format '{{.Manifest.Digest}}'
```

## Applying the bump

1. `Dockerfile` — update the tag and digest in `FROM`.
2. `Dockerfile` — also refresh the pinned agent CLIs to current (`npm view <pkg> version`):
   `@anthropic-ai/claude-code`, `@openai/codex`, `opencode-ai`.
3. `startos/versions/current.ts` — set `version` to `<upstream>:0` (reset the
   downstream revision to 0) and rewrite `releaseNotes`.
4. Optionally mention notable upstream changes in the release notes.
5. Build both arches (`make`) and publish.

Wrapper-only changes (no upstream bump) instead increment the downstream
revision: `0.11.2:0` → `0.11.2:1`.
