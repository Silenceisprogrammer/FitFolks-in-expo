# MASTER PROMPT — FitFolks Fitness App (Expo + React Native)

Paste this entire prompt into any AI assistant (or read it as a human) to get full context on the FitFolks codebase, architecture, and implementation status.

---

## 1. What this app is

**FitFolks** (package name `fifolks`, URL scheme `fitfolks`) is a mobile fitness app for students and users in semi-urban/rural India (Odisha-first). It works without wearables or gym equipment, uses the phone camera for workout tracking, promotes regional Indian/Odia nutrition, and drives retention through community challenges. Offline-first, privacy-first (camera footage never leaves the device), multilingual, usable on budget Android devices.

## 2. Tech stack (exact, verified)

- **Expo SDK ~57.0.0** (Expo CLI 57.x), **React Native 0.86.3**, **React 19.2.3**, TypeScript (strict, `tsc --noEmit` is clean)
- **expo-router ~57.0.0** — file-based routing (`app/` directory). Entry: `expo-router/entry`
- **State:** Zustand v4 (`store/`) with `persist` middleware → AsyncStorage. No Redux, no Context-for-state (Context only for theme + language)
- **UI:** React Native Paper + custom gradient components + `expo-linear-gradient`. **All color comes from gradient pairs** — there is no static color palette
- **Charts:** `react-native-svg` (custom `ProgressChart`, `LineChart`, `ProgressRing`, pose skeleton overlay)
- **Device APIs:** `expo-camera` (workouts + meal photos), `expo-image-picker`, `expo-location`, `expo-sensors`, `expo-sharing`, `expo-secure-store`, `expo-status-bar`
- **AI:** Google Gemini 2.0 Flash via REST for food-photo recognition (`services/geminiFoodRecognition.ts`), key from `EXPO_PUBLIC_GEMINI_API_KEY`
- **Installed but NOT wired up:** `@clerk/clerk-expo`, `expo-secure-store` (auth is currently custom, see §6), `react-native-paper` (partially used), `react-native-vector-icons` (do not use — see §10)

## 3. Folder structure

```
app/                      # expo-router routes (screens)
  _layout.tsx             # root Stack (all screens registered, headerShown:false)
  index.tsx               # splash → routes to /auth or /(tabs) based on stored user
  auth.tsx                # custom sign-in/sign-up (AsyncStorage "database")
  onboarding.tsx          # 10-step profile questionnaire
  (tabs)/                 # bottom tabs: index, workouts, nutrition, challenges, profile
  workout-details.tsx / camera-workout.tsx / workout-complete.tsx
  add-meal.tsx / meal-recognition.tsx / food-details.tsx
  challenge-details.tsx / leaderboard.tsx / accountability.tsx / nearby.tsx
  progress.tsx / monthly-report.tsx / privacy.tsx
components/ui/            # GradientButton, GradientCard, Badge, ProgressRing,
                          # SectionHeader, EmptyState, LoadingState, ErrorState
components/charts/        # ProgressChart, LineChart
components/workout/       # PoseOverlay (SVG skeleton over camera preview)
constants/                # theme.ts (light/dark GradientTheme), colors.ts (gradient pairs)
context/                  # ThemeContext (theme, mode, isDark, setMode, toggleTheme),
                          # LanguageContext (language, setLanguage, t)
data/                     # exercises.ts, foods.ts (20 Odia/Indian foods), challenges.ts,
                          # leaderboard.ts (demo), places.ts (sample), quotes.ts (12 daily quotes)
services/                 # 7 required abstractions + extras (see §5)
store/                    # userStore, workoutStore, nutritionStore, challengeStore, stepStore
types/                    # all TS models + expo-*.d.ts shims for untyped native modules
i18n/                     # en.ts, od.ts (Odia), hi.ts (Hindi); index.ts exports getTranslation()
utils/                    # storage.ts (AsyncStorage helpers + clearAllData), helpers.ts
hooks/                    # (useNotifications removed with expo-notifications)
assets/                   # icon.png, splash.png, adaptive-icon.png, favicon.png,
                          # FitFolks_Dark.png, FitFolks_Light.png (EXACT casing matters)
app.json + app.config.ts  # app.config.ts wins; scheme: 'fitfolks'
.env                      # EXPO_PUBLIC_GEMINI_API_KEY (currently placeholder)
```

## 4. Navigation & screens

- **Root Stack** (`app/_layout.tsx`): index → auth → onboarding → (tabs); all modal screens listed above are stack routes (e.g. `/workout-details?id=...`, `/workout-complete?sessionId=...`, `/challenge-details?id=...`, `/food-details?id=...`).
- **Bottom tabs** (`app/(tabs)/_layout.tsx`): Home, Workouts, Nutrition, Challenges, Profile — emoji icons, themed active/inactive colors.
- **Home** (`(tabs)/index.tsx`): greeting, daily rotating quote (`data/quotes.ts`, translated), progress rings (steps/water/streak), today's workout, 4 quick actions, active challenge, nutrition summary.
- **Camera workout** (`camera-workout.tsx`): front `CameraView`, countdown → active → paused/complete phases, mock pose service drives rep counter + posture banner (good/adjust/unsafe), `PoseOverlay` draws skeleton, then routes to `workout-complete` which shows reps/duration/form score/calories/tip/streak + Share.
- **Nutrition**: dashboard (calorie ring, macros, water stepper, meal log), `add-meal` (search + category filter + portions), `meal-recognition` (camera/gallery → Gemini → editable results with confidence %), `food-details` (nutrition facts + affordable alternatives).
- **Challenges**: heritage routes (Lingaraj→Konark 65km, Puri→Chilika 50km, Cuttack walk 30km, Coastal 480km) with milestones/badges, join + log-activity progress, per-challenge **Leaderboard tab**, plus global `leaderboard.tsx` (friends/college/hostel/city × weekly/monthly, demo-labeled).
- **Profile**: user card, dark/light/system theme toggle, language switcher, notification toggles (UI only), privacy screen link, delete-all-data.
- **Progress/report**: weekly charts, step/form/nutrition trends, adaptive-difficulty explainer, monthly report generator + Share.

## 5. Services (services/*.ts) — real vs mock

| Service | Status |
|---|---|
| `poseTracking.ts` | **REAL analysis + MOCK landmarks (V2 Phase 1)**: `services/pose/` engine computes real joint angles → hysteresis rep state machine → alignment checks → deterministic scoring. Landmarks come from `MockLandmarkSource` (kinematic rep cycles, labeled MOCK); MediaPipe/TFLite estimator plugs into the same `LandmarkSource` interface. Never uploads video |
| `geminiFoodRecognition.ts` | **REAL** (Gemini 2.0 Flash `generateContent`, base64 image, JSON parse, mapped to local food DB). **Falls back to mock when API key is missing/invalid** |
| `mealRecognition.ts` | Legacy mock, superseded by the Gemini service (meal-recognition screen uses Gemini) |
| `stepTracking.ts` | Mock step counts + AsyncStorage persistence; sensor integration points marked, Pedometer TODO |
| `nutrition.ts` | Real local logic: search/filter, macro math, daily summaries, budget/protein pickers |
| `challenge.ts` | Mock challenge + leaderboard data access |
| `location.ts` | Mock nearby places; OpenStreetMap/Overpass integration points marked |
| `report.ts` | Real local monthly-report computation + share-text builder |
| `foodDatabase.ts`, `partyFoodAdjuster.ts` | Present but **unused by UI** (party-adjuster UI was removed) |
| `notifications.ts` | **DELETED** — `expo-notifications` package fully uninstalled; reminder toggles are UI-only |

## 6. Auth & onboarding flow

`splash (index.tsx)` → if stored user with `onboarded:true` → `/(tabs)`, else → `/auth`. Auth checks the AsyncStorage "database": existing user signs straight in; new users sign up then complete the 10-step `onboarding.tsx` (name, age, gender, goal, activity, language, city, food budget, diet, workout time, community + camera-privacy explainer). No backend, no Clerk (package installed, not wired).

## 7. Theme & i18n rules (must follow)

- **Never use static palette colors.** Backgrounds, buttons, cards all use gradient pairs from `theme` (`theme.accentPrimary`, `theme.bgPrimary`, etc.). Dark/light via `useAppTheme()` → `{ theme, mode, isDark }`.
- **Theme-aware images:** `const { isDark } = useAppTheme()` + ternary between two **static** `require()` paths (Metro forbids dynamic require strings). Auth logo pattern: `isDark ? require('../assets/FitFolks_Dark.png') : require('../assets/FitFolks_Light.png')`.
- **All user-facing copy** goes through `const { t } = useLanguage()` (`t.home.*`, `t.workouts.*`, …). `od.ts`/`hi.ts` spread `en.ts` and override. If you add UI text, add the key to all three.
- Copy tone: encouraging, culturally appropriate (Odia/Indian food, heritage places), no body-image shaming, no medical claims, no "production-ready AI" claims.

## 8. Data models (types/index.ts)

`User`, `Workout`, `Exercise`, `WorkoutSession`, `PoseFeedback`, `MealEntry`, `FoodItem`, `NutritionSummary`, `Challenge`, `UserChallengeProgress`, `LeaderboardEntry`, `AccountabilityPartner`, `NearbyPlace`, `ProgressReport`, `StepData`, `Translation`. All stores persist to AsyncStorage; `clearAllData()` wipes everything.

## 9. Run & verify

```bash
npm install --prefer-offline --no-audit --no-fund --ignore-scripts  # --ignore-scripts required (react-native-screens postinstall fails on Windows: 'bob' not found)
npx tsc --noEmit        # must be clean
npx expo start --clear  # scan QR with Expo Go; --clear after dependency/file-structural changes
```
- Dev server: port 8081 (use `--port 8082` if busy). Bundle test: `http://localhost:8081/node_modules/expo-router/entry.bundle?platform=android&dev=true` should return 200. Asset test: `http://localhost:8081/assets/assets/icon.png?platform=android`.
- `npx expo install --check` should report only the harmless `react-dom` web-only mismatch. `npx expo run:android` needs Android Studio/SDK (not installed) — use Expo Go instead.

## 10. Gotchas (learned the hard way — do not regress)

1. **Asset `require` paths are case-sensitive** (Metro file map), even on Windows. `FitFolks_Light.png` ≠ `Fitfolks_Light.png` — wrong casing = `Unable to resolve` bundle 500. The auth logo bug was exactly this.
2. **No `<img>` in React Native** — always `Image` from `react-native`.
3. **Duplicate metro/file-map copies break the bundler** (`DependencyGraph.doesFileExist: Cannot read properties of undefined (reading 'exists')`, always on *asset* requests). Causes seen: invalid `node_modules/metro` stub dir, hoisting drift after interrupted installs, `react-native@0.86.3` pulling metro 0.84.6 alongside expo's 0.84.5. Fix = clean `node_modules` reinstall + verify `npm ls metro` is ELSPROBLEMS-free. Never run `expo start` mid-install (partial tree + fallback to stale parent `D:\programmingstuff\node_modules` causes `PluginError: Cannot find module './plugin/build/withRouter'`).
4. **`@expo/ui` must fully extract** — a killed install once left it without `src/jetpack-compose/`, breaking every expo-router Stack bundle. After any interrupted install, verify `node_modules/@expo/ui/src/jetpack-compose/index.ts` exists.
5. **Deleted dead features, keep them deleted:** `daily-recommendation` route + tab, Party Food Adjuster UI blocks, `ind.tsx` root stray file, `dailyRecommendation` service, `expo-notifications` + its service/hook. Stores import types from `types/`, never from services.
6. **`StepData` requires `target`** — always include it when constructing step objects; never spread an un-awaited promise.
7. `app.config.ts` overrides `app.json`; scheme is `fitfolks`. `react-native-vector-icons` is deprecated upstream — do not add new usages (emoji icons are the convention here).
8. Gemini key: without a real `EXPO_PUBLIC_GEMINI_API_KEY`, food recognition silently returns mock results — always check `.env` first when debugging recognition quality.

## 11. Suggested next steps (if continuing)

Wire Clerk (already installed) or keep custom auth; replace pose mock with MediaPipe/TFLite frame processor; replace step mock with `expo-sensors` Pedometer; connect `location.ts` to Overpass API; generate real PDF in `monthly-report`; add push via re-installed notifications; EAS build config for production (add `scheme`-safe linking + adaptive icon already present).
