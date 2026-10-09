# APIs & AI Used in FitFolks

Every external service in the app, its status, and where it is wired. Honor rule: never claim AI where mock data is used (see Status column).

## AI / ML

| Service | Status | Used for | Key / Config |
|---|---|---|---|
| Google Gemini 2.0 Flash (`generativelanguage.googleapis.com`) | **LIVE** | Food-photo recognition in `meal-recognition.tsx` via `services/geminiFoodRecognition.ts`. Falls back to clearly-labeled mock when offline/key missing | `EXPO_PUBLIC_GEMINI_API_KEY` |
| Pose analysis engine (`services/pose/`) | **REAL (local math)** | Joint angles, rep state machines, form scoring for squat/push-up/plank. Landmarks currently from a labeled mock source | None (on-device) |
| TensorFlow + MoveNet (`@tensorflow/tfjs`, `pose-detection`, `expo-gl` — installed) | **PLANNED** | Drop-in `LandmarkSource` for real on-device pose; see `services/pose/landmarks.ts` integration point | None (bundled/on-device) |
| Adaptive engine (`services/adaptiveWorkout.ts`) | **REAL (rules)** | Deterministic workout prescriptions from session history | None (local) |
| FitScore (`services/fitScore.ts`) | **REAL (math)** | Weighted score from workouts/form/streak/meals/steps | None (local) |

## APIs & Backends

| Service | Status | Used for | Key / Config |
|---|---|---|---|
| OpenStreetMap Overpass API (`overpass-api.de`) | **LIVE** | Nearby parks/tracks/gyms/routes in `services/location.ts`; 24h AsyncStorage cache; bundled sample fallback. Attribution rendered in-app | None (public, fair use) |
| Google Translate API (`translation.googleapis.com`) | **OPTIONAL** | Dynamic text (marathon facts, quotes) via `services/translation.ts` with disk cache; bundled strings otherwise | `EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY` |
| Google Maps | **KEY ONLY** | Route maps render offline with built-in SVG (`components/marathon/RouteMap.tsx`); swap to `react-native-maps` when a key + dev build is available | `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` |
| Supabase (`@supabase/supabase-js`) | **OPTIONAL** | Cloud sync for profiles, marathon joins, purchases (`services/backend.ts`); leaderboard realtime (`supabase/migrations/002_leaderboard_realtime.sql` for `leaderboard_entries`); local-first, works fully offline | `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_KEY`; apply `supabase/migrations/001_gamification.sql` + `002_leaderboard_realtime.sql` |
| Clerk (`@clerk/clerk-expo`) | **OPTIONAL** | Email/password + Google SSO (`components/auth/ClerkAuthScreen.tsx`); custom AsyncStorage auth fallback otherwise | `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| OSRM foot routing (`router.project-osrm.org`) | **LIVE w/ fallback** | Home→park mapline in `services/route.ts` + `app/nearby.tsx`; straight-line fallback offline | None (public demo server) |
| Agmarknet / data.gov.in | **STUB** | Market-price intent in `services/foodPrices.ts`; always falls back to curated Odisha static prices | Future `DATA_GOV_IN_KEY` |

## Device / Expo services

| Service | Status | Used for |
|---|---|---|
| expo-camera | LIVE | Workout tracking + meal photos (100% on-device, never uploaded) |
| expo-sensors (Pedometer/Accelerometer) | LIVE | Step counting (`services/stepTracking.ts`) |
| expo-location | LIVE | GPS for nearby search (falls back to Bhubaneswar) |
| expo-image-picker | LIVE | Meal photos + profile avatar upload |
| expo-sharing + RN Share | LIVE | Monthly reports, workout summaries, profile dashboard (text; image raster needs a dev build) |
| expo-web-browser | LIVE | In-app YouTube tutorials (`components/workout/TutorialVideo.tsx`) — stays in app |
| expo-notifications | **OPTIONAL (install)** | Daily motivation quotes (`services/motivation.ts`); `npx expo install expo-notifications`, SDK57 channel flow |
| Google Lens (app direct) | LIVE | `services/lens.ts` tries `googlelens://` → Play Store → `lens.google.com` (rechecked 2x) |
| WhatsApp Group | LIVE | `data/community.ts` → `https://chat.whatsapp.com/GLxe4g7XQGSI5pJseRI4GH` rendered in Support → Community |

## Demo / mock surfaces (clearly labeled in-app)

Leaderboard demo entries ("demo data" banner), sample nearby places (offline fallback banner), translation English fallback, store catalog (demo storefront, no checkout).
