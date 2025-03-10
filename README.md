# Spring  

Spring is a social activity matching app built with **React Native (Expo CLI)** and **Supabase**. Instead of matching profiles, users swipe on activities to find and join plans in real life.  

## Features  
- **Swipe on Plans** – Find and join activities based on interests.  
- **Real-Time Updates** – See new plans instantly.  
- **Messaging & Groups** – Chat with participants and hosts.  
- **Supabase Backend** – Authentication, database, and real-time sync.  

## Setup  
1. **Clone the repo**  
   ```sh
   git clone https://github.com/yourusername/spring.git && cd spring
   ```  
2. **Install dependencies**  
   ```sh
   npm install  
   ```  
3. **Set up Supabase**  
   - Create a Supabase project  
   - Add `.env` file with:  
     ```sh
     SUPABASE_URL=your_supabase_url  
     SUPABASE_ANON_KEY=your_supabase_key  
     ```  
4. **Start the app**  
   ```sh
   npx expo start  
   ```  

## Project Structure  
```
/spring  
├── /src  
│   ├── /components  # Reusable UI  
│   ├── /screens     # App screens  
│   ├── /services    # Supabase integration  
│   ├── App.js       # Entry point  
├── .env             # Environment variables  
├── package.json     # Dependencies  
├── README.md        # Documentation  
```  

## Deployment  
- **Run on Expo Go:** `npx expo start`  
- **Build for production:** `expo build:android` or `expo build:ios`  
- **Publish updates:** `expo publish`  

Spring makes meeting people easier—just swipe, join, and go.
