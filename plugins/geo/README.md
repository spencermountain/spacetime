<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div>lat/long ←→ timezone</div>
  <a href="https://npmjs.org/package/spacetime-geo">
    <img src="https://img.shields.io/npm/v/spacetime-geo.svg?style=flat-square" />
  </a>
  <a href="https://bundlephobia.com/result?p=spacetime-geo@latest">
    <img src="https://badgen.net/bundlejs/min/spacetime-geo" />
  </a>
</div>

<div align="center">
  <code>npm install spacetime-geo</code>
</div>

[spacetime](https://github.com/spencermountain/spacetime) plugin for determining a timezone based on a point on the earth, and vice-versa.

Coordinate lookup uses the maintained [PhotoStructure tz-lookup fork](https://github.com/photostructure/tz-lookup). Display polygons come from tagged [timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder/) releases, including ocean zones. UTC offsets and daylight-saving rules come from spacetime.

```js
import spacetime from 'spacetime'
import geo from 'spacetime-geo'
spacetime.extend(geo) //apply the plugin

//set a specific time somewhere
let s = spacetime('June 4 2018', 'Canada/Eastern').time('3:37pm')

//where is this timezone? (approx)
s.point()
//{ lat: 43.65, lng: -79.38 }

//go to a specific point (near paris)
s = s.in([48.7235, 1.9931])

s.timezone().name
//Europe/Paris
s.time()
//9:37pm
```

The current browser bundle is approximately **318 KB minified**, or **159 KB gzipped**, including polygon data.

```html
<script src="https://unpkg.com/spacetime"></script>
<script src="https://unpkg.com/spacetime-geo"></script>
<script>
  spacetime.extend(spacetimeGeo)
  var d = spacetime.now()
  //in the suburbs of São Paulo..
  d = d.in({ lat: -23.7201, lon: -46.9543 })
  console.log(d.time())
</script>
```

spacetime-geo accepts other formats of geolocation too:

```js
spacetime.now().in({ lat: 42.7235, lon: -73.6931 })
spacetime.now().in('48.7235, 1.9931')
spacetime.now().in(48.7235, 1.9931)
```

`.in()` preserves the instant and returns a new spacetime instance. Capture its return value. Zero coordinates are valid; malformed, missing, non-finite, or out-of-range coordinates return the original instance unchanged.

### Polygon geometry

```js
const s = spacetime.now('Europe/Paris')
const feature = s.geojson() // GeoJSON Feature with Polygon or MultiPolygon geometry
```

`.geojson()` resolves timezone aliases and returns an independent feature on every call, or `null` when no geometry is available. Coordinates follow GeoJSON order: `[longitude, latitude]`, unlike the `[latitude, longitude]` input to `.in()`.

Polygons are simplified with Turf using a `0.12°` tolerance (roughly 13 km at the equator), rounded to four decimal places, and stored with delta encoding. Only the requested timezone is decoded. Rings that collapse during rounding are omitted; the updater rejects a feature that disappears entirely. These shapes are intended for map display. They are separate from the data used by `.in()`.

### Data versions

```js
geo.version // '1.3.0' — plugin version
geo.lookupVersion // '11.7.0' — installed @photostructure/tz-lookup version at build time
geo.tzdbVersion // '2026e' — timezone-boundary-builder's IANA release tag

spacetime.tzdbVersion // IANA release used for spacetime's UTC/DST rules
```

These are separate versions and need not match. Metadata belongs to the imported plugin object, not individual spacetime instances. Updating the lookup package does not refresh the display polygons or spacetime's UTC/DST rules.

### Updating polygon data

From the repository root:

```sh
pnpm --filter spacetime-geo download
pnpm --filter spacetime-geo build
```

The updater selects the latest stable timezone-boundary-builder release and downloads its comprehensive GeoJSON dataset with ocean zones. To select a particular release instead:

```sh
pnpm --filter spacetime-geo download 2026e
pnpm --filter spacetime-geo build
```

Updates log the IANA release:

```text
Updated polygon data: IANA 2026e (444 zones)
```

The updater validates geometry and alias-aware coverage before replacing data. It records the release, source URL, download timestamp, archive SHA-256, and processing settings in `src/geojson/metadata.json`. Rebuilding refreshes the exported version metadata and all distribution bundles. Node 18+ and the `unzip` command are required; an optional `GITHUB_TOKEN` can authenticate release metadata requests.

### Caveats - **.in()**

PhotoStructure's lookup uses compressed, approximate timezone boundaries. Results can be inaccurate near borders, jagged coasts, or complex political boundaries. Changing this plugin's display-polygon simplification does not change lookup accuracy.

![1091](https://user-images.githubusercontent.com/399657/41735400-9279263a-7557-11e8-9c57-6f993e410e00.png)

Full-resolution polygon datasets are available from [timezone-boundary-builder releases](https://github.com/evansiroky/timezone-boundary-builder/releases).

### Caveats - **.point()**

`.point()` returns an [arbitrary representative point for each IANA timezone](./src/point/IANA-points.js), typically in a populous city, rather than a calculated centroid. It supports timezone aliases and returns `{}` when no point is available. This is subjective, especially for timezones like `Etc/GMT-9`, and is intended for centering a map.

### See also

- [spacetime-daylight](https://github.com/spencermountain/spacetime-daylight)

Thank you to [Evan Siroky](https://github.com/evansiroky) for maintaining [timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder)

MIT
Geojson licensed under [ODbL-1.0](./builds/timezone-data.LICENSE)

PRs welcome
