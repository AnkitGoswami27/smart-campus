import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Redirect to role-specific dashboard
    switch (user.role) {
      case 'student':
        navigate('/student');
        break;
      case 'faculty':
        navigate('/faculty');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        break;
    }
  }, [user, navigate]);

  if (!user) return null;

  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <AdminDashboard />; // Default to admin for demo
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;