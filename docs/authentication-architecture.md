# Authentication Architecture

This document outlines the authentication system and architecture used in the LastingMind mobile application.

## Overview

The application implements a robust authentication system built on:

- **Firebase Authentication** for secure user management and authentication
- **React Query** for authentication state management and caching
- **Expo Router** for route protection and navigation
- **Automatic token management** via Axios interceptors
- **Multiple authentication methods** including email/password and Google Sign-In

## Architecture Components

### 1. Firebase Authentication (`src/libs/firebase/index.ts`)

The application uses Firebase Auth as the core authentication service:

```typescript
import { getAuth } from '@react-native-firebase/auth'

export const auth = getAuth()
```

**Key Features:**

- Secure user authentication and management
- Automatic token refresh and validation
- Multiple authentication provider support
- Real-time authentication state changes

### 2. Authentication Services (`src/services/auth/index.ts`)

Centralized authentication methods with clean interfaces:

```typescript
export async function signInWithEmailAndPassword(email: string, password: string) {
  return Auth.signInWithEmailAndPassword(auth, email, password)
}

export async function signInWithGoogle() {
  // Google Sign-In implementation with credential creation
}

export async function signOut() {
  return Auth.signOut(auth)
}
```

**Supported Methods:**

- **Email/Password**: Standard email-based authentication
- **Google Sign-In**: OAuth integration with `@react-native-google-signin/google-signin`
- **Sign Out**: Secure session termination

### 3. User State Management (`src/hooks/auth/use-user/index.ts`)

React Query integration for authentication state:

```typescript
export const getUseUserQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: async () => {
      return await new Promise<FirebaseAuthTypes.User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user)
        })
        unsubscribe()
      })
    },
  })

export default function useUser() {
  return useQuery(getUseUserQueryOptions())
}
```

**Benefits:**

- Centralized user state management
- Automatic cache invalidation
- Loading states for UI components
- Real-time authentication status updates

### 4. Route Protection (`src/app/(protected)/_layout.tsx`)

Expo Router layout-based route protection:

```typescript
export default function ProtectedLayout() {
  const userQuery = useUser()

  if (userQuery.isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (!userQuery.data) {
    return <Redirect href="/auth/sign-in" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
```

**Features:**

- Automatic redirect to sign-in for unauthenticated users
- Loading state handling during authentication checks
- Protected route groups using Expo Router conventions

### 5. HTTP Client Integration (`src/libs/axios/index.ts`)

Automatic token injection and error handling:

```typescript
// Request interceptor for authentication
AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await getIdToken(auth.currentUser)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access - consider redirecting to login')
    }
    return Promise.reject(error)
  }
)
```

**Capabilities:**

- Automatic Firebase ID token injection
- 401 error detection and handling
- Request/response logging for debugging
- Seamless API authentication

## Authentication Flow

### 1. Initial App Load

```text
App Start
    ↓
Check Auth State (useUser hook)
    ↓
┌─────────────────┬─────────────────┐
│   Authenticated │ Not Authenticated │
│        ↓        │        ↓        │
│  Protected App  │   Redirect to   │
│                 │    Sign-In      │
└─────────────────┴─────────────────┘
```

### 2. Google Sign-In Flow

```text
User clicks "Sign in with Google"
    ↓
GoogleSignin.signIn()
    ↓
Extract ID Token
    ↓
Create Firebase Credential
    ↓
signInWithCredential(auth, credential)
    ↓
Invalidate React Query cache
    ↓
Redirect to protected routes
```

### 3. Email/Password Flow

```text
User enters credentials
    ↓
signInWithEmailAndPassword(email, password)
    ↓
Firebase validates credentials
    ↓
Authentication state updates
    ↓
useUser hook reflects new state
    ↓
Route protection redirects to app
```

## Custom Authentication Hooks

### Core Hooks

- **`useUser()`** - Provides current user state and loading status
- **`useUid()`** - Returns current user ID for quick access
- **`useGoogleSignIn()`** - Handles Google Sign-In with error handling
- **`useSignInWithEmailAndPassword()`** - Email/password authentication
- **`useSignUpWithEmailAndPassword()`** - User registration
- **`useSignOut()`** - Secure sign-out functionality

### Hook Usage Example

```typescript
function LoginScreen() {
  const googleSignIn = useGoogleSignIn()
  const emailSignIn = useSignInWithEmailAndPassword()

  const handleGoogleSignIn = () => {
    googleSignIn.mutate()
  }

  const handleEmailSignIn = (email: string, password: string) => {
    emailSignIn.mutate({ email, password })
  }

  return (
    // UI implementation
  )
}
```

## Security Features

### 1. Token Management

- **Automatic Refresh**: Firebase SDK handles token refresh automatically
- **Secure Storage**: Tokens stored securely by Firebase native modules
- **Request Injection**: Tokens automatically added to API requests
- **Expiration Handling**: 401 responses trigger re-authentication flow

### 2. Route Security

- **Layout-based Protection**: Protected routes use Expo Router layout groups
- **Automatic Redirects**: Unauthenticated users redirected to sign-in
- **Loading States**: Prevents flash of unauthorized content
- **Deep Link Protection**: Protected routes check auth before rendering

### 3. Error Handling

- **User-Friendly Messages**: Alert-based error feedback
- **Debug Logging**: Console logging for development debugging
- **Network Error Recovery**: Automatic retry mechanisms
- **State Synchronization**: Query invalidation after auth changes

## Google Sign-In Configuration

### Setup Requirements

1. **Firebase Project Configuration**
   - Enable Google Sign-In in Firebase Console
   - Configure OAuth consent screen
   - Download configuration files

2. **Expo Configuration**

   ```typescript
   GoogleSignin.configure({
     webClientId: Constants.expoConfig?.extra?.googleWebClientId,
   })
   ```

3. **Platform-Specific Setup**
   - iOS: Configure URL schemes and GoogleService-Info.plist
   - Android: Configure package name and SHA certificates

## Development Workflow

### Environment Setup

```bash
# Configure Google Sign-In
# Add googleWebClientId to app.config.ts extra field

# Install dependencies
npm install @react-native-firebase/auth
npm install @react-native-google-signin/google-signin
```

### Authentication Testing

```bash
# Start development server
npm start

# Test on different platforms
npm run ios
npm run android

# Test authentication flows
# - Email/password registration and login
# - Google Sign-In flow
# - Sign-out functionality
# - Route protection
```

## Best Practices

### 1. State Management

- Use `useUser()` hook for authentication state
- Invalidate queries after authentication changes
- Handle loading states in UI components
- Prefer React Query cache over local state

### 2. Error Handling

- Provide user-friendly error messages
- Log errors for debugging purposes
- Handle network failures gracefully
- Implement retry mechanisms for failed requests

### 3. Security

- Never log sensitive authentication data
- Use HTTPS for all API communications
- Implement proper session management
- Regular security audits of authentication flow

### 4. User Experience

- Show loading states during authentication
- Provide clear error feedback
- Implement smooth transitions between auth states
- Support both email and social authentication

## File Structure

```text
src/
├── app/
│   ├── (protected)/         # Protected route group
│   │   └── _layout.tsx     # Route protection logic
│   └── auth/               # Authentication screens
│       ├── sign-in/
│       └── sign-up/
├── hooks/auth/             # Authentication hooks
│   ├── use-user/           # User state management
│   ├── use-google-sign-in/ # Google Sign-In hook
│   ├── use-sign-in-with-email-and-password/
│   ├── use-sign-up-with-email-and-password/
│   ├── use-sign-out/       # Sign-out hook
│   └── use-uid/            # User ID hook
├── libs/
│   ├── firebase/           # Firebase configuration
│   └── axios/              # HTTP client with auth
├── modules/auth/           # Authentication UI components
│   ├── screens/            # Sign-in/Sign-up screens
│   └── parts/              # Reusable auth components
└── services/
    └── auth/               # Authentication services
```

This authentication architecture provides a secure, scalable foundation for user management while maintaining clean separation of concerns between authentication logic, state management, and UI components.
