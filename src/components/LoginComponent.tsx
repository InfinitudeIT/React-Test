
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../login.css';
import { loginUser } from '../services/apiService';// Import the API service

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to handle success/error messages
  const navigate = useNavigate();

  const handleLogin = async (e?: any) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      // Call the loginUser function from apiService
      const response = await loginUser({ email, password });
      localStorage.setItem('loggedInUserId', response.user_id);
      localStorage.setItem('authToken', response.access_token);
      // If login is successful, you can redirect or set success messages
      setMessage('Login successful!');
      navigate("/");
      console.log('Login response:', response);
    } catch (error) {
      // Handle errors such as wrong credentials
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login_main">
      <div className="login-container">
        <h2 className="login-title mb-4">Login</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3 text-end">
            <a href="/forgot-password" className='Forgot_txt'>Forgot password?</a>
          </div>
          <button type="submit" className="login_btn" onClick={handleLogin}>Login</button>
        </form>

        {/* Display success/error message */}
        {message && <div className="message">{message}</div>}

        <div className="or_txt mt-3 mb-3">OR</div>
        <button className="login_googlebtn">         
          Login with Google
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className='ms-2' />
        </button>
        <div className="dont_signuptxt mt-4">
          Don’t have an account? <a href="/register"> Sign up</a>
        </div>
      </div>
    </div>

  );
};

export default LoginComponent;

