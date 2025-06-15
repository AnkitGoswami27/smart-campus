import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Running in demo mode without database...');
  }
};

connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
  studentId: String,
  facultyId: String,
  department: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Demo data
const demoUsers = [
  {
    id: 'admin-demo',
    name: 'Admin User',
    email: 'admin@campus.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Administration'
  },
  {
    id: 'faculty-demo',
    name: 'Dr. Sarah Johnson',
    email: 'faculty@campus.edu',
    password: 'faculty123',
    role: 'faculty',
    facultyId: 'FAC001',
    department: 'Computer Science'
  },
  {
    id: 'student-demo',
    name: 'John Doe',
    email: 'student@campus.edu',
    password: 'student123',
    role: 'student',
    studentId: 'ST2024001',
    department: 'Computer Science'
  }
];

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if database is available
    if (mongoose.connection.readyState !== 1) {
      const demoUser = demoUsers.find(u => u.email === email && u.password === password);
      if (!demoUser) {
        return res.status(200).json({
          error: true,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { userId: demoUser.id, email: demoUser.email, role: demoUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
          studentId: demoUser.studentId,
          facultyId: demoUser.facultyId,
          department: demoUser.department
        }
      });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        error: true,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(200).json({
        error: true,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        facultyId: user.facultyId,
        department: user.department,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(200).json({
      error: true,
      message: 'Server error: ' + error.message
    });
  }
});

app.get('/api/auth/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(200).json({
      error: true,
      message: 'Access token required'
    });
  }

  // Handle demo tokens
  if (token === 'demo-token') {
    return res.json({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@campus.edu',
      role: 'admin',
      department: 'Administration'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', async (err, decoded) => {
    if (err) {
      return res.status(200).json({
        error: true,
        message: 'Invalid token'
      });
    }
    
    try {
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(200).json({
          error: true,
          message: 'User not found'
        });
      }
      res.json(user);
    } catch (error) {
      res.status(200).json({
        error: true,
        message: 'Server error: ' + error.message
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Demo Mode'}`);
});

export default app;