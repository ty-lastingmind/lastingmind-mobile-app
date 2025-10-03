# Data Fetching Architecture

This document outlines the data fetching patterns and architecture used in the LastingMind mobile application.

## Overview

The application uses a modern, type-safe data fetching architecture built on:

- **React Query** (@tanstack/react-query) for state management and caching
- **Axios** for HTTP client with custom interceptors
- **Orval** for auto-generating API clients from OpenAPI specifications
- **Firebase** for authentication and file storage

## Architecture Components

### 1. HTTP Client (`src/libs/axios/index.ts`)

The application uses a custom Axios instance with the following features:

```typescript
export const AXIOS_INSTANCE = Axios.create({
  baseURL: 'https://mobile-backend-dot-decisive-talon-457821-g4.uc.r.appspot.com',
  timeout: 10000,
})
```

**Key Features:**

- **Authentication**: Automatic Firebase token injection via request interceptors
- **Logging**: Request/response logging for debugging
- **Error Handling**: Global error handling with 401 redirect logic
- **Cancellation**: Built-in request cancellation support

### 2. Query Client Configuration (`src/libs/query-client/index.ts`)

React Query is configured with application-specific defaults:

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})
```

**Configuration Rationale:**

- `retry: false` - Manual error handling preferred
- `refetchOnWindowFocus: false` - Mobile app doesn't need window focus refetching
- `staleTime: Infinity` - Data stays fresh until manually invalidated

### 3. API Code Generation (`orval.config.ts`)

The application auto-generates TypeScript API clients using Orval:

```typescript
export default defineConfig({
  api: {
    input: {
      target: 'https://mobile-backend-dot-decisive-talon-457821-g4.uc.r.appspot.com/openapi.json',
    },
    output: {
      target: './src/services/api/generated.ts',
      client: 'react-query',
      httpClient: 'axios',
    },
  },
})
```

**Benefits:**

- Type-safe API calls
- Auto-generated React Query hooks
- Synchronized with backend API changes
- Consistent error handling

## Authentication Flow

### Firebase Integration

Authentication is handled through Firebase Auth with automatic token management:

1. **Token Injection**: Request interceptor adds Bearer token to all API calls
2. **User State**: `useUser` hook manages authentication state via React Query
3. **Error Handling**: 401 responses trigger authentication flow

```typescript
// Example: User authentication hook
export default function useUser() {
  return useQuery(getUseUserQueryOptions())
}
```

## Data Patterns

### 1. Query Hooks

Generated and custom hooks follow consistent patterns:

```typescript
// Custom hook example
export function useUploadAudioFile(folderName: string) {
  return useMutation({
    mutationFn: async ({ recordingUri, uid }) => {
      // Upload logic
    },
    onError: (e) => {
      Logger.logError('failed to upload audio file', e.message)
    },
  })
}
```

### 2. Service Layer

The application uses a modular service architecture:

```typescript
// src/services/index.ts
export * as Auth from './auth'
export * as Notifications from './notifications'
export * as Logger from './logger'
export * as Storage from './storage'
```

### 3. File Storage

Firebase Storage is used for file uploads:

```typescript
export function uploadFile(fileUri: string, fileStoragePath: string) {
  const fileRef = ref(storage, fileStoragePath)
  return putFile(fileRef, fileUri)
}
```

## Development Workflow

### API Generation Commands

```bash
# Generate API client from OpenAPI spec
npm run api:generate

# Watch for changes and regenerate
npm run api:watch

# Clean generated files
npm run api:clean
```

### Code Generation Process

1. Backend exposes OpenAPI specification
2. Orval fetches the spec and generates TypeScript types
3. React Query hooks are auto-generated for each endpoint
4. Custom Axios instance is used as the HTTP client

## Best Practices

1. **Use Generated Hooks**: Prefer auto-generated API hooks over manual fetch calls
2. **Service Layer**: Keep complex logic in service modules
3. **Error Handling**: Use consistent error logging through the Logger service
4. **Authentication**: Let interceptors handle token management automatically
5. **File Uploads**: Use Firebase Storage for media files, API for data

## File Structure

```text
src/
├── libs/
│   ├── axios/           # HTTP client configuration
│   ├── query-client/    # React Query setup
│   └── firebase/        # Firebase configuration
├── services/
│   ├── auth/           # Authentication services
│   ├── storage/        # File storage utilities
│   ├── logger/         # Logging utilities
│   └── notifications/  # Push notification handling
├── hooks/
│   └── auth/           # Authentication hooks
└── modules/
    └── */hooks/        # Module-specific data hooks
```

This architecture provides a scalable, type-safe foundation for data fetching while maintaining separation of concerns between API calls, authentication, and state management.
