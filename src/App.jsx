import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './CRUD_APP_AXIOS/AddUser';
import EditUser from './CRUD_APP_AXIOS/EditUser';
import UserList from './CRUD_APP_AXIOS/UserList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>User Management System</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
