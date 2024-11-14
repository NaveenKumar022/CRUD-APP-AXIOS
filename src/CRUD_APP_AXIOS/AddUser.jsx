import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z ]+$/.test(name)) {
      alert('Name should not contain numbers or special characters.');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert('Mobile number must be 10 digits.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Enter a valid email address.');
      return;
    }

    const newUser = { name, email, mobile };

    try {
      // Check if email or mobile already exists
      const existingUsers = await axios.get('http://localhost:3000/users');
      const emailExists = existingUsers.data.some(user => user.email === email);
      const mobileExists = existingUsers.data.some(user => user.mobile === mobile);

      if (emailExists) {
        alert('Email already exists.');
        return;
      }

      if (mobileExists) {
        alert('Mobile number already exists.');
        return;
      }

      await axios.post('http://localhost:3000/users', newUser);
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
