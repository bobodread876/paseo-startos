# Paseo for StartOS
#
# Child image of the official Paseo image (pinned by digest), adding the
# coding-agent CLIs that Paseo orchestrates. This follows upstream's documented
# pattern (docker/Dockerfile.agents.example in getpaseo/paseo): the daemon
# discovers agent CLIs on PATH, so shipping them in the image makes agents
# work out of the box on StartOS.
#
# The base image already: runs tini as an init, drops root -> paseo (1000) via
# gosu, listens on 0.0.0.0:6767, serves the web UI, and health-checks
# /api/health. StartOS drives it with its own entrypoint contract
# (sdk.useEntrypoint() + runAsInit) and passes PASEO_PASSWORD/PASEO_HOSTNAMES
# via env at runtime.
FROM ghcr.io/getpaseo/paseo:0.11.2@sha256:ea6a922a7282d5368f7d0eae17caff6ce5ccde2bbac3f559c2e4c483d1cf2059

USER root

# Coding-agent CLIs. Pinned for reproducible builds; bump alongside the Paseo
# version when updating the package (see UPDATING.md).
RUN npm install -g --no-audit --no-fund \
      @anthropic-ai/claude-code@2.1.300 \
      @openai/codex@0.162.1 \
      opencode-ai@1.19.0 \
    && npm cache clean --force
