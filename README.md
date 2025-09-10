# 🌱 EcoLearn - Environmental Education Platform

A comprehensive environmental education platform that gamifies learning about sustainability through interactive quizzes, real-world challenges, and community engagement.

## Features

### 📚 Learning System
- Interactive quizzes with multiple categories (recycling, energy, water, climate, biodiversity, pollution)
- Multiple difficulty levels (easy, medium, hard)
- Timed quizzes with automatic scoring
- Progress tracking and performance analytics
- Points-based reward system

### 🎯 Challenge System
- Environmental action challenges with different difficulty levels
- Daily challenges for consistent engagement
- Challenge categories (recycling, energy, water, transportation, waste-reduction, gardening)
- Progress tracking with proof submission support
- Time-limited challenges with point rewards

### 👤 User Management & Profiles
- Email/password authentication
- User profiles with eco-points and achievements
- Activity tracking (streaks, completed challenges/quizzes)
- School and grade information storage
- Display name and avatar support

### 🏆 Gamification
- Eco-points reward system
- Daily streak tracking
- Leaderboard with school rankings
- Achievement badges and levels
- Community impact tracking

### 📊 Analytics & Progress
- Personal progress dashboard
- Statistics on completed activities
- Performance trends and insights
- Community impact metrics

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React** 18 with functional components and hooks
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **React Hot Toast** for notifications
- **Framer Motion** for animations

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecolearn
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
node seedData.js
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install and configure Tailwind CSS:
```bash
npx tailwindcss init -p
```

4. Start the frontend development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Quizzes
- `GET /api/quizzes` - Get all quizzes (with filtering)
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Challenges
- `GET /api/challenges` - Get all challenges (with filtering)
- `GET /api/challenges/daily` - Get daily challenge
- `POST /api/challenges/:id/complete` - Complete a challenge

### Leaderboard
- `GET /api/leaderboard/global` - Global leaderboard
- `GET /api/leaderboard/school` - School leaderboard
- `GET /api/leaderboard/stats` - User statistics

### Users
- `PUT /api/users/profile` - Update user profile

## Database Schema

### User Model
- Personal information (email, displayName, school, grade)
- Gamification data (ecoPoints, level, streak)
- Activity tracking (completedQuizzes, completedChallenges)
- Achievements and progress

### Quiz Model
- Quiz metadata (title, description, category, difficulty)
- Questions with multiple choice options
- Scoring and time limits

### Challenge Model
- Challenge details (title, description, category, difficulty)
- Instructions and tips
- Point rewards and time limits
- Proof requirements

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by Heroicons
- UI components inspired by Tailwind UI
- Environmental data and facts from various educational sources

---

Built with ❤️ for environmental education and sustainability awareness.