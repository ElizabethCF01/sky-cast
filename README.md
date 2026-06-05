# SkyCast

SkyCast is a cross-platform (iOS, Android, web) weather app. It shows the current weather for your device's location, lets you search any city in the world for its current conditions, hourly trend, and 7-day forecast, and lets you save places as favorites for one-tap access. It can schedule a daily local reminder to check the forecast, and persists your favorites and last viewed location on-device. Because it uses free, open weather data, there are no accounts or API keys needed to get real forecasts.

## Technical overview

An [Expo](https://expo.dev) (SDK 56) React Native app in TypeScript. Routing uses **Expo Router** with file-based routes under `src/app/` only, keeping navigation separate from application logic. Application code is organized **by feature** (`weather`, `explore`, `favorites`, `notifications`, `settings`) as isolated **modlets** — each a self-contained folder exposing its public surface through a barrel `index.ts`. Shared code (design system, storage helpers) lives in `src/shared/` and is imported via explicit subpaths (`#design/*`, `#shared/*`), not deep relative paths.

**Stack:** TypeScript · React 19 / React Native 0.85 · Expo SDK 56 + Expo Router · AsyncStorage (local persistence) · Jest + `@testing-library/react-native` · ESLint / Prettier / Knip · pnpm.

**External services:** [Open-Meteo Forecast & Geocoding APIs](https://open-meteo.com/) — free, **no API key required**.

## Getting started

**Prerequisites:** Node 22 (`.nvmrc`) · pnpm 10.24.0. To run on a device, use [Expo Go](https://expo.dev/go) or an iOS/Android simulator.

**Environment variables:** none — SkyCast only calls the key-less Open-Meteo APIs.

```bash
pnpm install --frozen-lockfile   # install
pnpm start                       # dev server (then press i / a / w)
pnpm ios | pnpm android | pnpm web

pnpm test                        # run tests (Jest)
pnpm lint                        # typecheck + ESLint + Prettier + Knip
pnpm build                       # expo export (iOS + Android)
```
