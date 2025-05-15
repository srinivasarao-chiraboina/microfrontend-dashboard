import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const UserManagementApp = () => {
  return (
    <Routes>
      <Route path="" element={<UserList />} />
      <Route path="new" element={<UserForm />} />
      <Route path=":id/edit" element={<UserForm />} />
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
};

export default UserManagementApp;