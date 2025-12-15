import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Timeline from './components/Timeline';
import MurmurDetail from './pages/MurmurDetail';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Layout><Timeline /></Layout></PrivateRoute>} />
          <Route path="/murmurs/:id" element={<PrivateRoute><Layout><MurmurDetail /></Layout></PrivateRoute>} />
          <Route path="/users/:id" element={<PrivateRoute><Layout><UserProfile /></Layout></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;