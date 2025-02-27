# Spring - Mobile Social Activities Platform

Spring is a mobile application that helps users discover and join social activities based on their interests. The app provides an intuitive, swipe-based interface for browsing activities, detailed activity pages, real-time chat functionality, and user profiles.

## Features

- **Swipe-Based Discovery**: Find activities with an intuitive Tinder-like interface
- **Activity Management**: Create, join, and manage social activities
- **Real-Time Chat**: Communicate with activity participants via real-time group chat
- **User Profiles**: Customize your profile with interests and preferences
- **Authentication**: Secure user authentication via Supabase

## Tech Stack

- **Frontend**: 
  - React Native with Expo
  - TypeScript
  - React Navigation for routing
  - Zustand for state management
  - React Hook Form + Zod for form validation
  - React Native Reanimated for animations

- **Backend**:
  - Supabase for authentication, database, and real-time features
  - PostgreSQL database (managed by Supabase)
  - Supabase Storage for files and images

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your iOS/Android device or iOS Simulator/Android Emulator
- A Supabase account and project

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spring-expo-app.git
cd spring-expo-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Update the Supabase URL and key in `src/lib/supabase.ts` with your actual values

### Running the App

#### iOS Simulator

```bash
npm run ios
```

#### Android Emulator

```bash
npm run android
```

#### Web

```bash
npm run web
```

#### Using Expo Go on your Device

```bash
npm start
```
Then scan the QR code with the Expo Go app (Android) or the Camera app (iOS).

## Database Schema

The Supabase database includes the following tables:

- **profiles**: User profile information
- **activities**: Activity details (title, description, location, etc.)
- **participants**: Many-to-many relationship between users and activities
- **messages**: Chat messages for activity groups

## Deployment

This application can be deployed using Expo EAS Build:

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in to Expo: `eas login`
3. Configure build: `eas build:configure`
4. Build for your platforms:
   - iOS: `eas build --platform ios`
   - Android: `eas build --platform android`

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).
