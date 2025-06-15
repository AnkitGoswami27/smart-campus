# Smart Campus Management System

A comprehensive, production-ready campus management solution built with React, Node.js, Express, and MongoDB. This system provides role-based dashboards and integrated campus services for educational institutions.

## 🚀 Features

### Core Functionality
- **Multi-role Authentication System** - Separate dashboards for Students, Faculty, and Administrators
- **Real-time Attendance Tracking** - QR code integration for seamless attendance management
- **Advanced Course Management** - Complete course scheduling and enrollment system
- **Resource Booking System** - Manage labs, classrooms, and equipment reservations
- **Digital Gradebook** - Performance analytics and grade management
- **Event Management** - Campus events with registration and notifications
- **Integrated Communication** - Messaging system between users

### Technical Features
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark/Light Theme** - User preference-based theme switching
- **Real-time Updates** - Live data synchronization
- **Advanced Analytics** - Interactive charts and performance metrics
- **Secure Authentication** - JWT-based authentication with role-based access
- **RESTful API** - Well-structured backend API

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-campus-management-system
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
MONGODB_URI=mongodb://localhost:27017/campus_management
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3001
VITE_API_URL=http://localhost:3001/api
```

### 4. Start the Application
```bash
# Start the backend server
npm run server

# In a new terminal, start the frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 👥 Default User Accounts

The system comes with pre-configured demo accounts:

### Administrator
- **Email:** admin@campus.edu
- **Password:** admin123
- **Access:** Full system administration

### Faculty
- **Email:** faculty@campus.edu
- **Password:** faculty123
- **Access:** Course and student management

### Student
- **Email:** student@campus.edu
- **Password:** student123
- **Access:** Personal dashboard and course access

## 🏗 Project Structure

```
smart-campus-management-system/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── pages/              # Main application pages
│   ├── services/           # API service functions
│   └── types/              # TypeScript type definitions
├── server/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   └── index.js            # Server entry point
└── public/                 # Static assets
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/students` - Get all students
- `GET /api/faculty` - Get all faculty members

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course

### Attendance
- `GET /api/attendance/student/:id` - Get student attendance
- `POST /api/attendance` - Mark attendance

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources/:id/book` - Book a resource

## 🎨 Design System

### Color Palette
- **Primary:** Blue (#2563EB)
- **Secondary:** Indigo (#4F46E5)
- **Accent:** Emerald (#10B981)
- **Success:** Green (#059669)
- **Warning:** Amber (#D97706)
- **Error:** Red (#DC2626)

### Typography
- **Font Family:** Inter
- **Weights:** 300, 400, 500, 600, 700
- **Line Heights:** 150% (body), 120% (headings)

### Spacing
- **System:** 8px base unit
- **Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Role-based Access Control** - Different permissions for each user role
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Configured for secure cross-origin requests

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach** - Optimized for mobile devices
- **Flexible layouts** - Adapts to different screen sizes
- **Touch-friendly interfaces** - Optimized for touch interactions
- **Progressive enhancement** - Works on all modern browsers

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
The backend can be deployed to services like Heroku, Railway, or DigitalOcean:
```bash
# Set environment variables on your hosting platform
# Deploy the server directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- **Mobile App** - React Native mobile application
- **Real-time Chat** - WebSocket-based messaging
- **Payment Integration** - Fee payment processing
- **Advanced Analytics** - Machine learning insights
- **API Documentation** - Swagger/OpenAPI documentation
- **Testing Suite** - Comprehensive test coverage

---

Built with ❤️ for modern educational institutions.