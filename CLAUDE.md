# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Hero App fitness tracking application built as a monorepo with three main applications:

- **apps/web**: React/TypeScript frontend with Vite, Tailwind CSS, and Radix UI components
- **apps/mobile**: React Native/Expo app with TypeScript, NativeWind, and React Native Elements
- **apps/api**: Express.js REST API with MongoDB/Mongoose, Supabase integration, and JWT authentication

## Development Commands

### Root Level (Turborepo)
```bash
npm run dev     # Start all apps in development mode
npm run build   # Build all apps
npm run lint    # Lint all apps
npm run test    # Run tests for all apps
npm run clean   # Clean build artifacts
```

### Web App (apps/web)
```bash
npm run dev            # Start Vite dev server
npm run build          # Build for production (TypeScript + Vite)
npm run lint           # ESLint with TypeScript
npm run format         # Format with Prettier
npm run format:check   # Check formatting
npm run preview        # Preview production build
```

### Mobile App (apps/mobile)
```bash
npm run start     # Start Expo dev client
npm run web       # Start Expo web version
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run lint      # ESLint with auto-fix
npm run format    # Format with Prettier
```

### API (apps/api)
```bash
npm start         # Start production server
npm run dev       # Start with nodemon
npm run lint      # ESLint with auto-fix
npm run test      # Run Jest tests
npm run format    # Format with Prettier
```

## Architecture Overview

### Data Flow
- **Authentication**: Supabase Auth with JWT tokens
- **Database**: MongoDB with Mongoose ODM for the API, Supabase for auth
- **State Management**: React Context API (no Redux)
- **Styling**: Tailwind CSS with component libraries (Radix UI for web, React Native Elements for mobile)

### Key Features
- Exercise tracking with multiple types (upper body, lower body, cardio)
- Session management with workout programs
- Trophy/achievement system
- User profiles and progress tracking
- PWA capabilities for web app

### Database Models
- User (authentication and profile)
- Exercise Types (predefined workout categories)
- Exercise User (user's exercise instances)
- Sessions (workout sessions)
- Programs (structured workout plans)
- Trophies (achievements)
- Feedback (user feedback system)

### API Structure
- RESTful endpoints in `apps/api/api/`
- Authentication middleware with JWT
- Supabase integration for auth
- MongoDB for data persistence
- Seeding scripts for initial data

### Mobile App Architecture
- Expo Router for navigation
- TypeScript with strict typing
- NativeWind for styling (Tailwind CSS for React Native)
- React Hook Form for form management
- Expo modules for device capabilities

### Web App Architecture
- React Router for client-side routing
- Radix UI components with custom theming
- Recharts for data visualization
- PWA with offline capabilities
- Responsive design with Tailwind CSS

## Testing

- **API**: Jest tests in `apps/api/test/`
- **Web/Mobile**: No specific test setup currently configured
- Run tests from root: `npm run test`

## Key Directories

- `apps/api/models/`: Mongoose schemas
- `apps/api/api/`: API route handlers
- `apps/web/src/pages/`: React page components
- `apps/web/src/components/`: Reusable React components
- `apps/mobile/app/`: Expo Router pages
- `apps/mobile/components/`: React Native components

## Authentication Flow

1. User signs up/in through Supabase Auth
2. JWT tokens stored in secure storage (mobile) or localStorage (web)
3. API middleware validates JWT on protected routes
4. User data synced between Supabase and MongoDB