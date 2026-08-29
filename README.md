# Golden Hour

A mobile-first hackathon prototype for a faster citizen flow when reporting online financial fraud in India. It is a front-end demonstration only: no data is sent anywhere.

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. The app accepts any login details; the demo credentials shown on the first screen are simply for presentation.

## Production build

```bash
npm run build
```

The static output is created in `dist/`.

## Deploy on Vercel

Import this repository into Vercel. Use the default Vite settings:

- Build command: `npm run build`
- Output directory: `dist`

No environment variables or server configuration are required.

## Prototype boundaries

All state remains in the current browser tab's React session. Login, bank contacts, acknowledgement numbers, and every submission are mocked. A production service would require approved integrations with bank fraud desks and NCRP, plus secure identity verification and helpline routing.
