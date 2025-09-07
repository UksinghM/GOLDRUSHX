# ExtendEase - Admin Login System

This project includes a complete admin login system with frontend and backend integration.

## Features

- ✅ Admin login with email and password
- ✅ JWT token authentication
- ✅ Protected admin dashboard
- ✅ Remember me functionality
- ✅ Responsive UI with Tailwind CSS
- ✅ Form validation with Formik and Yup
- ✅ MongoDB database integration

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection:
   ```
   DB_URL=mongodb://localhost:27017/extendease
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start MongoDB (make sure MongoDB is running on your system)

5. Create an admin user:
   ```bash
   node createAdmin.js
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## Admin Login Credentials

After running the `createAdmin.js` script, you can login with:

- **Email**: `admin@extendease.com`
- **Password**: `admin123`

## How to Test

1. Make sure both backend and frontend servers are running
2. Open your browser and go to `http://localhost:3000/admin/login`
3. Enter the admin credentials above
4. Click "Sign In to Admin Panel"
5. You should be redirected to the admin dashboard

## API Endpoints

- `POST /admin/login` - Admin login endpoint
- `GET /admin/dashboard` - Admin dashboard (protected)

## File Structure

```
ExtendEase/
├── backend/
│   ├── connection.js          # MongoDB connection
│   ├── createAdmin.js         # Script to create admin user
│   ├── index.js              # Main server file
│   ├── models/
│   │   └── Admin.js          # Admin model with password hashing
│   └── routers/
│       └── admin.js          # Admin routes
└── frontend/
    ├── next.config.mjs       # Next.js config with API proxy
    └── src/app/admin/
        ├── login/
        │   └── page.jsx      # Admin login page
        └── dashboard/
            └── page.jsx      # Admin dashboard
```

## Troubleshooting

1. **MongoDB Connection Error**: Make sure MongoDB is running and the connection string is correct
2. **CORS Error**: The backend is configured to allow all origins for development
3. **Login Fails**: Make sure you've run the `createAdmin.js` script to create the admin user
4. **Dashboard Not Loading**: Check if the JWT token is properly stored in localStorage/sessionStorage

## Security Notes

- In production, change the JWT secret to a strong, unique key
- Use HTTPS in production
- Implement rate limiting for login attempts
- Add password complexity requirements
- Use environment variables for sensitive data 