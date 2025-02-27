# Spring - Social Activities Platform

Spring is a modern web application that helps users discover and join social activities based on their interests. The platform provides an intuitive, swipe-based interface for browsing activities, detailed activity pages, real-time chat functionality, and user profiles.

## Features

- **Swipe-Based Discovery**: Find activities with an intuitive Tinder-like interface
- **Activity Management**: Create, join, and manage social activities
- **Real-Time Chat**: Communicate with activity participants via real-time group chat
- **User Profiles**: Customize your profile with interests and preferences
- **Authentication**: Secure user authentication via Supabase

## Tech Stack

- **Frontend**: 
  - Next.js (React framework with App Router)
  - TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Zustand for state management
  - React Hook Form + Zod for form validation

- **Backend**:
  - Supabase for authentication, database, and real-time features
  - PostgreSQL database (managed by Supabase)
  - Supabase Storage for files and images

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account and project

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spring-app.git
cd spring-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The Supabase database includes the following tables:

- **profiles**: User profile information
- **activities**: Activity details (title, description, location, etc.)
- **participants**: Many-to-many relationship between users and activities
- **messages**: Chat messages for activity groups

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Set the environment variables
4. Deploy!

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).
