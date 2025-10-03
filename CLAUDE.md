# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run web version

### Code Quality

- `npm run format:check` - Check code formatting with Prettier
- `npm run format:fix` - Fix code formatting with Prettier
- `npm run lint:check` - Check for linting issues with ESLint
- `npm run lint:fix` - Fix linting issues with ESLint
- `npm run type:check` - Run TypeScript type checking

### API Generation

- `npm run api:generate` - Generate API client from OpenAPI spec
- `npm run api:watch` - Watch for changes and regenerate API client
- `npm run api:clean` - Clean generated API files

## Project Architecture

### Tech Stack

- **Framework**: React Native with Expo (~53.0.17)
- **Navigation**: Expo Router with file-based routing
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios with custom interceptors
- **API Generation**: Orval for auto-generating TypeScript clients
- **Authentication**: Firebase Auth with Google Sign-In
- **Storage**: Firebase Storage for file uploads
- **Forms**: React Hook Form with Zod validation

### Architecture Overview

The app follows a modular architecture with feature-based organization:

```text
src/
├── app/                    # Expo Router file-based routing
│   ├── (protected)/       # Protected routes requiring auth
│   └── auth/              # Authentication screens
├── modules/               # Feature modules
│   ├── auth/              # Authentication components
│   ├── interview/         # Interview feature
│   ├── journal/           # Journal feature
│   ├── questions/         # Questions feature
│   ├── profile/           # User profile
│   ├── components/        # Shared components
│   └── ui/                # UI component library
├── libs/                  # Core libraries
│   ├── axios/             # HTTP client setup
│   ├── firebase/          # Firebase configuration
│   └── query-client/      # React Query setup
├── services/              # Business logic services
│   ├── api/               # Auto-generated API client
│   ├── auth/              # Authentication services
│   ├── storage/           # File storage utilities
│   └── notifications/     # Push notifications
└── providers/             # React context providers
```

### Data Fetching Architecture

The app uses a sophisticated data fetching system:

1. **HTTP Client**: Custom Axios instance with automatic Firebase token injection
2. **API Generation**: Orval auto-generates TypeScript API clients from OpenAPI spec
3. **State Management**: React Query handles caching, synchronization, and error states
4. **Authentication Flow**: Firebase Auth with automatic token refresh and 401 handling

### Key Configuration Files

- `orval.config.ts` - API generation configuration
- `app.config.ts` - Expo application configuration
- `tailwind.config.js` - Custom design system with CSS variables
- `src/global.css` - Global styles and CSS variable definitions

### Module Structure

Each feature module follows a consistent structure:

```text
modules/[feature]/
├── screens/               # Screen components
├── parts/                 # Reusable parts/components
├── hooks/                 # Feature-specific hooks
└── index.tsx              # Module entry point
```

### Design System

The app uses a custom design system built on NativeWind with:

- CSS variables for theming (light/dark mode)
- Semantic color tokens
- Consistent typography scale
- Reusable UI components in `src/modules/ui/`

### Authentication

- Firebase Auth with Google Sign-In integration
- Automatic token management via Axios interceptors
- Protected routes using Expo Router layout groups
- User state managed through React Query

### File Storage

- Firebase Storage for audio files and media
- Automatic file upload utilities in `src/services/storage/`
- Audio recording and playback capabilities

## Development Notes

- Always run `npm run api:generate` after backend API changes
- Use the generated API hooks instead of manual HTTP calls
- Follow the modular architecture when adding new features
- All new UI components should use the design system tokens
- Run type checking and linting before committing changes
