
// import React, { useState } from "react";
// import axios from "axios";
// import { FaReact } from "react-icons/fa6";
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import ThirdPartyAuthButton from "./ThirdPartyAuthButton";
// import InputWithLabel from "./InputWithLabel";
// import SimpleInput from "./SimpleInput";
// import WhiteButton from "./WhiteButton";
// import { registerUser } from '../services/apiService';

// const RegisterComponent = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null); 
//   const navigate = useNavigate(); 
//   const handleSubmit = async (e ?: any) => {
//     e.preventDefault(); 

//     // Ensure password and confirm password match
//     if (password !== confirmPassword) {
//       // setError("Passwords do not match.");
//       return;
//     }
//     // Construct the data to send in the POST request
//     const data = {
//       email: email,
//       password: password,
//     };
//     try {
//       // Call the API service to register the user
//       const response = await registerUser(data); // Use the registerUser API call

//       // Handle success - Navigate to login or another page
//       console.log("User registered successfully:", response);

//       // Redirect to the login page after successful registration
//       navigate("/login");
//     } catch (error) {
//       console.error("Error registering user:", error);

//     }
//   };

//   return (
//     <div className="register-container">
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col items-center gap-10">
//           <FaReact className="icon-react" />
//           <h2>Register on the dashboard!</h2>

//           <div className="flex gap-5">
//             <ThirdPartyAuthButton>
//               <FaGoogle className="icon" />
//             </ThirdPartyAuthButton>
//             <ThirdPartyAuthButton>
//               <FaGithub className="icon" />
//             </ThirdPartyAuthButton>
//           </div>

//           <p>OR</p>

//           <div className="form-group">
//             <InputWithLabel label="Email">
//               <SimpleInput
//                 type="email"
//                 placeholder="Enter your email..."
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </InputWithLabel>

//             <InputWithLabel label="Password">
//               <SimpleInput
//                 type="password"
//                 placeholder="Enter your password..."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </InputWithLabel>

//             <InputWithLabel label="Confirm Password">
//               <SimpleInput
//                 type="password"
//                 placeholder="Confirm your password..."
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </InputWithLabel>
//           </div>

//           {error && <p className="error-message">{error}</p>}

//           <WhiteButton text="Register now" type="submit" className="white-button"
//           onClick={handleSubmit}  />

//           <p className="redirect-login">
//             Have an account?{" "}
//             <Link to="/login">
//               Login <FaArrowRight className="icon-arrow" />
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterComponent;

import React, { useState } from 'react';
import '../Registration.css';
import { registerUser } from '../services/apiService'; // Import the API function
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  // State to handle form input
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to handle success or error messages
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e?: any) => {
    setFormData({
      ...formData, // Copy existing state
      [e.target.name]: e.target.value, // Update only the changed field
    });
  };

  // Handle form submission
  const handleSubmit = async (e?: any) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await registerUser(formData); // Send data to backend
      setMessage('Signup successful!'); // Display success message
      navigate("/login");
      console.log(response); // Handle response data (for debugging)
    } catch (error) {
      setMessage('Signup failed. Please try again.'); // Display error message
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="login_main">
      <div className="login-container">
        <h2 className="login-title mb-4">Signup</h2>
        <form >
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group mb-3 text-end">
            <a href="ForgotPassword.js" className='Forgot_txt'>Forgot password?</a>
          </div>
          <button type="submit" className="login_btn" onClick={handleSubmit}>
            Signup
          </button>
        </form>

        {/* Display success/error message */}
        {message && <div className="message">{message}</div>}

        <div className="or_txt mt-3 mb-3">OR</div>
        <button className="login_googlebtn">
           Signup with Google
           <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className='ms-2' />
        </button>
        <div className="dont_signuptxt mt-4">
          Already have an account? <a href="login">Login</a>
        </div>
      </div>
    </div>

  );
};

export default RegisterComponent;