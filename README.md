# Murmur Application - Complete Implementation

## 🎯 Appeal Points

- **Full-Stack Implementation**: Complete Twitter-like application with NestJS backend and React frontend
- **Proper Architecture**: Clean separation of concerns, modular code structure
- **Authentication**: JWT-based authentication system with secure password hashing
- **Real-time Features**: Like/Unlike functionality, follow/unfollow system
- **Pagination**: Efficient data loading with pagination support
- **Type Safety**: Full TypeScript implementation across backend and frontend
- **Database Design**: Well-structured relational database with proper indexes and foreign keys
- **Git Workflow**: Proper feature branch workflow with meaningful commits

## ✅ Implemented Features

### Backend (NestJS)
- ✅ User authentication (Register/Login/Logout with JWT)
- ✅ User management (Profile, Follow/Unfollow)
- ✅ Murmur CRUD operations
- ✅ Like/Unlike functionality
- ✅ Timeline feed (shows followed users' murmurs)
- ✅ Pagination for all list endpoints
- ✅ Input validation with class-validator
- ✅ Secure password hashing with bcrypt
- ✅ Proper error handling

### Frontend (React)
- ✅ User authentication (Login/Register pages)
- ✅ Timeline page with pagination (10 murmurs per page)
- ✅ Murmur detail page
- ✅ User profile page (own and other users)
- ✅ Create murmur functionality
- ✅ Delete murmur (own murmurs only)
- ✅ Like/Unlike murmurs
- ✅ Follow/Unfollow users
- ✅ Responsive UI with Tailwind CSS
- ✅ Protected routes

### Database
- ✅ Users table
- ✅ Murmurs table
- ✅ Follows table (user relationships)
- ✅ Likes table
- ✅ Proper indexes for performance
- ✅ Foreign key constraints
- ✅ Sample data for testing

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/murmurs` - Get user's murmurs
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user
- `GET /api/users/:id/followers` - Get user's followers
- `GET /api/users/:id/following` - Get users being followed

### Murmurs
- `GET /api/murmurs` - Get all murmurs (paginated)
- `GET /api/murmurs/:id` - Get murmur by ID
- `POST /api/murmurs/me/murmurs` - Create murmur
- `DELETE /api/murmurs/me/murmurs/:id` - Delete own murmur
- `POST /api/murmurs/:id/like` - Like murmur
- `DELETE /api/murmurs/:id/like` - Unlike murmur
- `GET /api/murmurs/timeline/me` - Get timeline (paginated)

## 🚀 How to Run

### Prerequisites
- Node.js v20.x
- npm/pnpm/yarn
- Docker & Docker Compose

### Database Setup
```bash
cd db
docker compose build
docker compose up -d
```

### Backend Setup
```bash
cd server
npm install
npm run start:dev
# Server runs on http://localhost:3001
```

### Frontend Setup
```bash
cd src
yarn install
yarn dev
# App runs on http://localhost:3000
```

### Access the Application
1. Open http://localhost:3000
2. Register a new account
3. Start posting murmurs!

## Thank You
Thank you for this opportunity to demonstrate my full-stack development skills. I enjoyed building this application and look forward to your feedback!
