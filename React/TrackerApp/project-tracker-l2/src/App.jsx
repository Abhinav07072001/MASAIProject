import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={
        <PrivateRoute><Dashboard /></PrivateRoute>
      }/>

      <Route path="/projects/new" element={
        <PrivateRoute><AddProject /></PrivateRoute>
      }/>

      <Route path="/projects/:id" element={
        <PrivateRoute><ProjectDetails /></PrivateRoute>
      }/>

      <Route path="/projects/:id/edit" element={
        <PrivateRoute><EditProject /></PrivateRoute>
      }/>

      <Route path="*" element={<div style={{padding:20}}>404</div>} />
    </Routes>
  );
}
