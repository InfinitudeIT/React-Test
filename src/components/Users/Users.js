import React, { useState } from 'react';
import './Users.css';

function Users() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit

    const { username, email, password, confirmPassword } = formData;

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!username || !email || !password) {
      setError('All fields are required!');
      return;
    }

    setError(''); // Clear error on successful validation
    console.log('Form submitted:', formData);

    // Handle the form submission logic (e.g., API call)
    alert(`User ${username} created successfully!`);
  };

  return (
    <div className="form-container">
      <h2>Create New User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">User Name:&nbsp;</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:&nbsp;</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password:&nbsp;</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Re-enter Password:&nbsp;</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Create User</button>
        </div>
      </form>
    </div>
  );
}

export default Users;
