# Cryptocurrency portfolio tracker

React 18, Redux Toolkit Query, styled-components, Chart.js, and Create React App 5.
The existing layouts, themes, charts, search, currency selection, and locally stored
portfolio are retained. No backend or new runtime library was added.

## Runtime and installation

Use **Node.js 24 LTS** (tested with 24.21.0) and npm 10 or newer. `.nvmrc` and
`package.json` declare the target. With a Node version manager, select Node 24
before installing. Do not use `--openssl-legacy-provider`, `--force`, or
`--legacy-peer-deps`.

```sh
npm ci
npm start
```

Use `npm ci` for repeatable deployments; commit `package-lock.json` with dependency
changes. Include development dependencies during the build: lint, Babel, and CRA's
TypeScript peer pin are build-time requirements.

## What caused deployment trouble

The original checkout had no explicit Node pin and used react-scripts 5.0.1 with
Webpack 5.73.0. Its production build succeeded locally on Node 26.3.0. An old-Node
requirement or OpenSSL failure was **not reproduced** in this checkout.

A strict `CI=true` build did fail: unused imports in `src/app/store.js` and loose
equality in the portfolio form became fatal lint warnings. These are fixed without
disabling CI checks. The old root-only homepage and BrowserRouter also caused
asset-path and refreshed deep-link problems on GitHub Pages project sites.

Refreshing the dependency tree exposed CRA's optional TypeScript peer resolution:
npm selected TypeScript 7, which broke its lint tooling. TypeScript is pinned to
4.9.5 to match CRA's supported peer range; the application remains JavaScript.
The Babel private-property plugin is explicitly declared because CRA's preset
references it without reliably declaring it. ESLint is explicit for the lint
command. Unused axios, cors, and canvas-gradient dependencies were removed.
Chart.js registration imports were corrected for the refreshed version, and the
existing testing library was updated for React 18's act API.

## Checks

```sh
npm run lint
npm run test:ci
npm run build
```

For the same strict build used by CI:

```sh
# macOS/Linux
CI=true npm run build
```

```powershell
# PowerShell
$env:CI = 'true'
npm run build
```

Regression tests cover shared 429 cooldowns (including Retry-After dates and
non-JSON errors), explicit retry timing, debounced/empty search, empty portfolios,
invalid form values, asynchronous saves, failed saves, and retained holdings.
Tests mock API responses and do not consume CoinGecko quota.

Verified after a clean `npm ci` on Node 24.21.0: lint passed with zero warnings,
all 12 tests passed, and `CI=true npm run build` compiled successfully. CRA emits
a nonfatal Node `fs.F_OK` deprecation warning. Browser visual/end-to-end testing
and a live deployment were not performed; use the deployment smoke checklist below.

## CoinGecko behavior

- Both API slices use a 15-second request timeout and a shared cooldown after HTTP
  429. Retry-After seconds or HTTP dates are honored; absent/invalid headers use
  60 seconds. Retry is explicit, with a countdown, rather than automatic repeated
  requests. Requests already in flight cannot be recalled; cooldown is per tab.
- Search is trimmed, URL-encoded, debounced by 350 ms, and skipped while empty or
  while the debounce is pending. Cached search results remain for five minutes.
- Market query caches remain for five minutes after the last subscriber; data
  older than two minutes refreshes when a subscriber mounts. There is no polling.
  History is cached for an hour. An empty portfolio sends no price request; all
  portfolio IDs are batched in one stable, sorted request.
- Query consumers use data for the current arguments, preventing old coin/currency
  responses from being shown as the newly selected values. Same-query cached data
  remains visible during refresh. Errors offer retry; network failures, denied
  access, missing data, and rate limits have readable messages.
- Portfolio submissions capture the selected coin/date/amount, wait for that
  history request, and save exactly once. Failed saves retain the form. Missing
  live quotes show N/A while saved holdings remain available for removal.

This remains a browser-only app using the public CoinGecko endpoint. Rate limits,
CORS policy, service availability, and access to historical dates depend on
CoinGecko. Historical data can be unavailable or restricted by plan. No API keys
are bundled. If authenticated access is needed, use a separately managed backend
proxy; private keys must not be placed in React build-time environment variables.

## Deploy

1. Set the hosting build runtime to Node 24 and install with `npm ci` (including
   dev dependencies).
2. Run the checks above, then `npm run build` with `CI=true`.
3. Publish the contents of **build/** to your static host. No Node server is needed
   to serve the generated files.
4. Routes use hashes (`/#/portfolio`, `/#/bitcoin`) and assets use relative paths,
   so a project subdirectory works without SPA rewrite rules. Existing clean-path
   bookmarks such as `/portfolio` need updating or a host redirect to `/#/portfolio`.
5. For the existing GitHub Pages workflow, verify the intended Git remote and run
   `npm run deploy`. This builds and pushes `build/` to the `gh-pages` branch.
   Configure repository Settings > Pages to serve that branch's root. Publishing
   requires your Git credentials; it is not performed by the maintenance changes.
6. Smoke-check search, coin details/charts, pagination, currency/theme switching,
   adding/removing a holding, reloading a hash route, and retained local storage.

Portfolio, theme, and currency remain in localStorage under the existing keys.
Changing hostname or browser does not transfer that data.

## Remaining maintenance limitations

Create React App is deprecated and remains here to keep this maintenance task
scoped: https://react.dev/blog/2025/02/14/sunsetting-create-react-app
The legacy dependency tree still reports security advisories, including build/test
packages and React Router 6. The final install reported 101 vulnerabilities
(3 low, 35 moderate, 63 high); `npm audit fix --dry-run` proposed no compatible
changes. An audit is not a clean bill of health for the browser
bundle. Router major upgrades and replacing CRA need a separate compatibility
review; `npm audit fix --force` can select breaking or unusable versions and is not
an appropriate deployment fix. Only serve the production build, not the development
server. Run `npm audit` when preparing a release to review current advisories.

References: https://github.com/nodejs/Release and
https://create-react-app.dev/docs/deployment/ .
