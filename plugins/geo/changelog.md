This project follows semVer, where:

- **[major]** is an API, or result-format change
- **[minor]** is a result change
- **[patch]** is a bugfix

<!--
 -->

### 1.3.0 [Oct 2026]

- **[change]** - Replace the abandoned `tz-lookup` package with `@photostructure/tz-lookup@11.7.0`.
- **[change]** - Replace Geoapify polygon downloads with tagged timezone-boundary-builder releases, including ocean zones. The bundled data uses IANA release `2026e` and contains 444 timezone features.
- **[add]** - Expose `geo.lookupVersion` for the bundled lookup package and `geo.tzdbVersion` for the polygon release, alongside `geo.version`. Metadata is non-enumerable and is not registered as spacetime methods.
- **[add]** - Log the IANA release during polygon updates; support selecting a release tag, validate alias-aware coverage, and record the source URL, archive checksum, timestamp, and processing settings.
- **[change]** - Simplify display polygons with Turf at `0.12°`, round coordinates to four decimal places, and delta-encode the data. Decode only the requested timezone while preserving the GeoJSON return format. Omit collapsed rings and reject updates that lose an entire feature.
- **[fix]** - Preserve zero coordinates and consistently return the original instance for malformed, missing, non-finite, or out-of-range inputs to `.in()`.
- **[fix]** - Normalize GeoJSON lookup keys, support timezone aliases for geometry and representative points, and return independent geometry on each `.geojson()` call.
- **[add]** - Add representative points for Coyhaique and Ciudad Juárez; remove unused polygon lookup code and relocate the GeoJSON export helper to `scripts/`.
- **[add]** - Include boundary-data attribution and the ODbL license in the distribution.
- **[test]** - Add regression coverage for coordinate formats, immutability, rounding, collapsed geometry, release selection, and update coverage. Verify source, ESM, CommonJS, and browser builds.
