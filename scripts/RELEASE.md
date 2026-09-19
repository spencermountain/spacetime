# Local release checks

Run `npm run test:release` before opening the release PR to master.
Use `npm run --silent test:release` to also hide npm's command header.
No dependencies are installed. Existing build/test tools, `tsx`, and `attw`
must be available locally or on PATH. Network access is required.

Each check prints only ✓ or ✗ and a short name, with no details or summary.
Terminal output uses green for passes and red for failures. Set `FORCE_COLOR=1`
to force colors or `NO_COLOR=1` to disable them. Run individual commands for
diagnostics. The script exits nonzero if any check fails. Tests run with pipefail
so the TAP reporter cannot hide failures. The existing `test:types` runs runtime
tests through tsx; it does not replace a TypeScript compiler check.

Checks include npm latest version, npm audit (all severities, including dev
dependencies), npm lockfile metadata consistency, zero runtime dependencies,
ESLint, build, source/bundle/type tests, Git diff whitespace/conflict markers,
package contents, packed ESM/CommonJS smoke tests, and Are the Types Wrong.
Version comparison expects stable major.minor.patch releases.

Size checks compare the compressed package, unpacked package, and each of the
three bundles against npm's latest release, failing on growth above 10%.
For an intentional larger release, set
`RELEASE_MAX_SIZE_GROWTH_PERCENT=20 npm run test:release` (or another percentage).
The previous tarball is downloaded without installing it or running its scripts.
Temporary tarballs are removed afterward.

The build regenerates tracked assets. Review those changes and the changelog
before committing. Audit only reports findings; nothing is automatically fixed,
committed, or published.
