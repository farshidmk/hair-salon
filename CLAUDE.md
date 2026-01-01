# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev          # Runs on http://localhost:3000

# Production build
npm run build        # Creates optimized production build
npm start            # Runs production server

# Code quality
npm run lint         # Run ESLint
```

## Project Overview

A Next.js 15 (App Router) hair salon booking application built for Persian-speaking users with RTL support. The application uses an external API for all backend operations and implements OTP-based authentication with JWT tokens stored in HTTP-only cookies.

**Stack:** Next.js 15, React 19, TypeScript (strict), Material-UI v7, React Query v5, Tailwind CSS v4, React Hook Form + Zod

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
  - `(root)/` - Public pages using AppLayout (homepage, admin)
  - `auth/` - Authentication pages with custom glassmorphism layout
- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks (theme, responsive breakpoints)
- `src/providers/` - Application-level providers (React Query, MUI Theme with RTL)
- `src/services/` - Backend communication layer (API wrapper, cookie management)
- `src/shared/` - Constants, utilities, and configuration
- `src/types/` - TypeScript type definitions

### Authentication Flow

The application implements a two-step OTP authentication system:

1. **Phone Number Entry** → `POST Account/SendTotpCode` → Returns `userId`
2. **OTP Verification** → `POST Account/VerifyTotpCode` → Returns JWT tokens
3. **Token Storage** → Tokens stored in HTTP-only cookies via `setLoginInfoInCookie()` in [src/services/cookies.ts](src/services/cookies.ts)
4. **Token Verification** → JWT decoded server-side using `getTokenInfo()` which extracts user claims (phone, role, name)

**Key Files:**
- [src/app/auth/login/_components/LoginForm.tsx](src/app/auth/login/_components/LoginForm.tsx) - Phone input with validation (`^09[0-9]{9}$`)
- [src/app/auth/login/_components/OtpInputForm.tsx](src/app/auth/login/_components/OtpInputForm.tsx) - 6-digit OTP with countdown timer
- [src/services/cookies.ts](src/services/cookies.ts) - Server-side JWT cookie handling

### API Integration

**No Next.js API routes exist.** All backend calls go to external API defined in `.env`:

```
NEXT_PUBLIC_API_URL = http://reserve.nrugroup.ir/api/v1/
```

**API Layer Architecture:**
- [src/shared/api.ts](src/shared/api.ts) - Axios instance with base URL
- [src/services/serverCall.ts](src/services/serverCall.ts) - Generic request wrapper integrated with React Query
- [src/types/server.d.ts](src/types/server.d.ts) - `ServerResponse<T>` and `ServerCall<T>` types

**React Query Configuration:**
- Global setup in [src/providers/AppProviders.tsx](src/providers/AppProviders.tsx)
- `queryFn: getRequest()` - Auto-converts `queryKey` array to URL path
- `mutationFn: mutationRequest()` - Centralized mutation handler
- `refetchOnWindowFocus: false` - Disabled by default

**Usage Pattern:**
```typescript
// Queries
const { data } = useQuery({ queryKey: ["endpoint", "path"] });

// Mutations
const { mutate } = useMutation<ResponseType, Error, ServerCall<RequestType>>({});
mutate({ method: "POST", url: "Account/SendTotpCode", data: {...} });
```

### Material-UI + RTL Setup

The application is configured for RTL (right-to-left) Persian language support:

- **Theme:** [src/hooks/useCustomTheme.ts](src/hooks/useCustomTheme.ts) - Custom palette (primary: `#f0768b`, secondary: `#957DAD`), rounded buttons/cards
- **RTL Provider:** [src/providers/AppThemeProvider.tsx](src/providers/AppThemeProvider.tsx) - Uses `stylis-plugin-rtl` for CSS transformation
- **Font:** Vazirmatn (Persian) loaded via [src/shared/fonts.ts](src/shared/fonts.ts) with weights 100-900
- **Root Layout:** [src/app/layout.tsx](src/app/layout.tsx) - `dir="rtl"`, `lang="fa"`

### Layout System

**Two distinct layouts:**

1. **AppLayout** - Used by public pages `(root)/`
   - Defined in [src/components/layout/AppLayout.tsx](src/components/layout/AppLayout.tsx)
   - Includes header with logo, navigation, and auth status
   - Applied via [src/app/(root)/layout.tsx](src/app/(root)/layout.tsx)

2. **Auth Layout** - Used by login/signup pages
   - Defined in [src/app/auth/layout.tsx](src/app/auth/layout.tsx)
   - Gradient background with centered glassmorphism card
   - Responsive with backdrop blur effect

### Path Aliases

TypeScript configured with `@/*` alias pointing to `./src/*`:

```typescript
import { api } from "@/shared/api";
import { Header } from "@/components/layout/Header";
```

## Important Patterns

### Server-Side Functions

Cookie operations MUST run server-side (use `"use server"` directive):
- `setLoginInfoInCookie(token, refreshToken)` - Stores JWT in cookies
- `getTokenInfo()` - Decodes JWT and extracts user data

These functions use `jsonwebtoken` library and Node.js `cookies()` from `next/headers`.

### Form Handling

Forms use React Hook Form + Zod validation:
```typescript
const form = useForm<FormType>({
  resolver: zodResolver(schema),
  defaultValues: {...}
});
```

### Responsive Design

Use custom hook for breakpoints:
```typescript
const isSmallScreen = useIsSmallScreen(); // Uses MUI breakpoint 'sm'
```

### Styling Approach

Combination of Material-UI components and Tailwind utility classes:
- MUI components for complex UI (Cards, Buttons, Typography)
- Tailwind for spacing, layout, and responsive utilities
- Custom MUI theme overrides in `useCustomTheme.ts`

## Known API Endpoints

- `POST Account/SendTotpCode` - Send OTP to phone number
- `POST Account/VerifyTotpCode` - Verify OTP and receive JWT tokens

## Environment Variables

Required in `.env`:
```
NEXT_PUBLIC_API_URL=http://reserve.nrugroup.ir/api/v1/
```

## Code Style

- **Prettier config:** 120 char width, 2 spaces, semicolons, double quotes
- **ESLint:** Extends `next/core-web-vitals` and `next/typescript`
- **Language:** Persian UI text, English code/comments
