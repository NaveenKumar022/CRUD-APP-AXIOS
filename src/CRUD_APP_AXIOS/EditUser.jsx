import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from URL
  const navigate = useNavigate(); // For navigation

  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data); // Set the user data in the state
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!/^[a-zA-Z ]+$/.test(user.name)) {
      alert('Name should not contain numbers or special characters.');
      return;
    }

    if (!/^\d{10}$/.test(user.mobile)) {
      alert('Mobile number must be 10 digits.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      alert('Enter a valid email address.');
      return;
    }

    try {
      // Check if email or mobile already exists (excluding the current user)
      const existingUsers = await axios.get('http://localhost:3000/users');
      const emailExists = existingUsers.data.some(u => u.email === user.email && u.id !== id);
      const mobileExists = existingUsers.data.some(u => u.mobile === user.mobile && u.id !== id);

      if (emailExists) {
        alert('Email already exists.');
        return;
      }

      if (mobileExists) {
        alert('Mobile number already exists.');
        return;
      }

      // Make PUT request to update user details
      const response = await axios.put(`http://localhost:3000/users/${id}`, user);
      console.log('User updated:', response.data);
      alert('User updated successfully');
      navigate('/'); // Navigate back to the user list page
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Mobile"
          name="mobile"
          value={user.mobile}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
