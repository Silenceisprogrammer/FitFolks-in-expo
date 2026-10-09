# FitFolks 🏃

**Fitness for Everyone** — A culturally relevant, affordable fitness app for students and users in semi-urban and rural India.

## Features

- **Clerk Authentication** — Email/password + Google sign-in (falls back to built-in auth when unconfigured)
- **Profile Dashboard** — Gamertag, avatar upload, level, XP, coins, badges, personal stats, shareable summary
- **Levels & Coins** — Slow-by-design level curve, +500 coins per level (+1000 every 10th), level-up celebration
- **Store (demo)** — Spend coins on fitness-band, health subscription, protein powder showcases (no real checkout)
- **Marathon Events** — Odisha heritage routes with checkpoints, XP, 2-per-week cap, +1500 XP per finish
- **Workout Sharing** — Minimal/Neon/Heritage share cards via the native share sheet
- **Support Page** — Developer contact (GitHub/WhatsApp/Instagram), Discord + WhatsApp community channels, tech credits, hackathon prototype note
- **Achievements (100)** — Minecraft-style board, no emojis, step/workout/streak/form/marathon/nutrition tiers + dummy merchant coupons (e.g. 20k steps “Konark to Girnar Hill”)
- **In-App Tutorials** — YouTube workout videos opened via in-app browser, squat (reps) / pushup (reps) / plank (timer) filters
- **Unsafe-Form Guard** — Red screen filter on bad posture, auto-stop after 8 sustained unsafe flags, voided workout earns 0 XP
- **Food Grades (A–F)** — Protein/fiber vs fat/calories scoring on every food + AI result
- **Local Market Prices** — Odisha static prices + Agmarknet stub, home→park OSM OSRM routes
- **Home Dashboard** — FitScore hero, adaptive mission checklist, journey progress, step tracking, water intake
- **Real Pose Analysis** — Joint-angle state machines (squat/push-up/plank), rep counting, form scoring, on-device only
- **Workout Library** — No-equipment workouts including Surya Namaskar, yoga asanas, and mobility routines
- **Camera Workout Tracking** — Rep counting, posture feedback, and form analysis (privacy-first, all processing local)
- **Nutrition** — Regional Indian and Odia food database, Gemini photo recognition, affordable meal swaps, macro tracking
- **Challenges** — Heritage challenges (Lingaraj to Konark, Puri to Chilika), fitness challenges, and community events
- **Leaderboards** — Friends, college, hostel, and city rankings
- **Accountability Partners** — Invite friends, send encouragement, and set mutual reminders
- **Nearby Places** — Live OpenStreetMap parks, tracks, outdoor gyms, and walking routes (offline fallback included)
- **Progress Tracking** — Weekly activity, step trends, form score improvement, and monthly reports
- **Multilingual** — English, Odia (ଓଡ଼ିଆ), and Hindi (हिन्दी)
- **Dark/Light Mode** — Gradient-based theming with system preference support
- **Privacy-First** — Local-first data, no camera footage uploaded

## Tech Stack

- **React Native** with **Expo** (SDK 57)
- **TypeScript** — Strict mode (`npx tsc --noEmit` clean)
- **Expo Router** — File-based routing
- **React Native Paper** — UI components
- **Zustand** — State management with AsyncStorage persistence
- **Clerk** — Authentication (email + Google SSO, optional)
- **Supabase** — Optional cloud sync for gamification (local-first)
- **Google Gemini 2.0 Flash** — Food photo recognition
- **OpenStreetMap Overpass API** — Live nearby places
- **TensorFlow (installed)** — MoveNet on-device pose next step
- **Expo Camera** — Camera-based workout tracking
- **Expo Linear Gradient** — Gradient-based theming
- **React Native SVG** — Charts and pose overlay visualization

## Environment (.env)

```bash
EXPO_PUBLIC_GEMINI_API_KEY=...        # food recognition (required for real AI results)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=... # auth (optional — custom auth fallback otherwise)
EXPO_PUBLIC_SUPABASE_URL=...          # cloud sync (optional — works offline without)
EXPO_PUBLIC_SUPABASE_KEY=...          # publishable key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=...   # future native maps (offline SVG map is default)
EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=... # auto-translation (optional — bundled strings otherwise)
```

Apply `supabase/migrations/001_gamification.sql` in the Supabase dashboard to enable cloud tables.

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go app on your device (or Android/iOS emulator)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device

1. Install **Expo Go** from the App Store or Google Play
2. Scan the QR code from the terminal with Expo Go
3. The app will load and you can start using it

### Running on Emulator

```bash
# Android
npx expo start --android

# iOS (macOS only)
npx expo start --ios
```

## Project Structure

```
FiFolks/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout with providers
│   ├── index.tsx           # Splash screen
│   ├── onboarding.tsx      # Onboarding flow
│   ├── (tabs)/             # Tab navigation
│   │   ├── index.tsx       # Home dashboard
│   │   ├── workouts.tsx    # Workout library
│   │   ├── nutrition.tsx   # Nutrition dashboard
│   │   ├── challenges.tsx # Challenges
│   │   └── profile.tsx    # Profile & settings
│   ├── workout-details.tsx
│   ├── camera-workout.tsx
│   ├── workout-complete.tsx
│   ├── add-meal.tsx
│   ├── meal-recognition.tsx
│   ├── food-details.tsx
│   ├── challenge-details.tsx
│   ├── leaderboard.tsx
│   ├── accountability.tsx
│   ├── nearby.tsx
│   ├── progress.tsx
│   ├── monthly-report.tsx
│   └── privacy.tsx
├── components/             # Reusable UI components
│   ├── ui/                 # GradientButton, GradientCard, etc.
│   ├── charts/             # ProgressChart, LineChart
│   └── workout/            # PoseOverlay
├── constants/              # Theme and color definitions
├── data/                   # Mock data (exercises, foods, challenges, etc.)
├── i18n/                   # Translations (en, od, hi)
├── services/               # Service abstractions
│   ├── poseTracking.ts     # Mock pose estimation adapter
│   ├── nutrition.ts        # Nutrition calculations
│   ├── mealRecognition.ts  # Mock AI meal recognition
│   ├── stepTracking.ts     # Step counting
│   ├── challenge.ts        # Challenge management
│   ├── location.ts         # Location services
│   └── report.ts           # Report generation
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
└── utils/                  # Helper utilities
```

## Mock Services & Integration Points

The app uses mock services that are clearly separated and can be replaced with real implementations:

### PoseTrackingService
- **Current**: Mock adapter that simulates landmarks, rep counting, and posture feedback
- **Integration**: Replace with MediaPipe Pose, TensorFlow Lite MoveNet, or Expo Camera frame processors
- **Location**: `services/poseTracking.ts`

### MealRecognitionService
- **Current**: Mock recognition with confidence scores and editable results
- **Integration**: Replace with TensorFlow Lite food classification model or ONNX Runtime
- **Location**: `services/mealRecognition.ts`

### StepTrackingService
- **Current**: Mock step data
- **Integration**: Replace with expo-sensors Pedometer API or Google Fit
- **Location**: `services/stepTracking.ts`

### LocationService
- **Current**: Mock nearby places data
- **Integration**: Replace with OpenStreetMap Overpass API and expo-location
- **Location**: `services/location.ts`

## Privacy & Security

- **Local-First**: All data is stored on the device using AsyncStorage
- **No Uploads**: Camera footage is never uploaded to any server
- **Offline-First**: The app works without an internet connection
- **Transparent**: Clear privacy explanations during onboarding
- **User Control**: Delete all data option in Profile settings

## Design System

- **Gradient-Based**: All colors come from gradient pairs, no static palette
- **Dark/Light Mode**: Full theme support with system preference detection
- **Warm & Friendly**: Rounded cards, friendly illustrations, culturally appropriate copy
- **Accessible**: Large touch targets, high contrast, readable typography

## License

MIT
