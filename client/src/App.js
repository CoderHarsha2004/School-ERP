import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FacultyModule from './components/FacultyModule';
import StudentModule from './components/StudentModule';
import ClassModule from './components/ClassModule';
import FeesModule from './components/FeesModule';
import ReportsModule from './components/ReportsModule';

const App = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/faculty" element={<FacultyModule />} />
      <Route path="/students" element={<StudentModule />} />
      <Route path="/classes" element={<ClassModule />} />
      <Route path="/fees" element={<FeesModule />} />
      <Route path="/reports" element={<ReportsModule />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
