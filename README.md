# junction-playground

Exploring normalized wearable health data with the [Junction API](https://junction.health).

## What it does

A Next.js 16 (App Router) + TypeScript application that:

- Fetches body composition, heart rate, sleep, and activity data from 300+ wearable providers via the Junction API.
- Normalises all provider data into a single common schema through the Junction API's unified data model.
- Proxies every API call through server-side Next.js API routes so your `JUNCTION_API_KEY` is never exposed to the browser.
- Ships with **demo mode** — when `JUNCTION_API_KEY` is absent, realistic mock data is shown so the UI can be explored without any credentials.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.local.example .env.local
# Edit .env.local and add your JUNCTION_API_KEY and JUNCTION_DEFAULT_USER_ID

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    page.tsx                        # Dashboard (server component)
    layout.tsx                      # Root layout
    api/junction/
      providers/route.ts            # GET /api/junction/providers
      body/route.ts                 # GET /api/junction/body
      heartrate/route.ts            # GET /api/junction/heartrate
      sleep/route.ts                # GET /api/junction/sleep
      activity/route.ts             # GET /api/junction/activity
  components/
    MetricCard.tsx                  # Reusable metric card + row
    BodyCard.tsx                    # Body composition card
    HeartRateCard.tsx               # Heart rate card
    SleepCard.tsx                   # Sleep card
    ActivityCard.tsx                # Activity / steps card
    ProviderList.tsx                # Connected providers list
  lib/
    junction.ts                     # Server-side Junction API client
    mockData.ts                     # Demo-mode mock data
  types/
    junction.ts                     # TypeScript types for Junction API
```

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/junction/providers` | List connected wearable providers |
| GET | `/api/junction/body?user_id=…[&date=YYYY-MM-DD]` | Body composition summary |
| GET | `/api/junction/heartrate?user_id=…[&date=YYYY-MM-DD]` | Heart rate summary + samples |
| GET | `/api/junction/sleep?user_id=…[&date=YYYY-MM-DD]` | Sleep stages and score |
| GET | `/api/junction/activity?user_id=…[&date=YYYY-MM-DD]` | Steps, calories, active minutes |

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Jest) |
