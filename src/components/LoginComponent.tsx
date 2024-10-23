
// // import { FaReact } from "react-icons/fa6";
// // import { FaGoogle } from "react-icons/fa6";
// // import { FaGithub } from "react-icons/fa6";
// // import { Link } from "react-router-dom";
// // import { FaArrowRight } from "react-icons/fa6";
// // import { useState } from "react";
// // import ThirdPartyAuthButton from "./ThirdPartyAuthButton";
// // import InputWithLabel from "./InputWithLabel";
// // import SimpleInput from "./SimpleInput";
// // import WhiteButton from "./WhiteButton";

// // const LoginComponent = () => {
// //     const [ email, setEmail ] = useState("john@email.com");
// //     const [ password, setPassword ] = useState("pass1234567890");
// //   return (
// //     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
// //       <div className="flex flex-col items-center gap-10">
// //         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />

// //         <div className="w-full flex flex-col gap-5">
// //           <InputWithLabel label="Email">
// //             <SimpleInput type="email" placeholder="Enter a email..." value={email} onChange={(e) => setEmail(e.target.value)} />
// //           </InputWithLabel>

// //           <InputWithLabel label="Password">
// //             <SimpleInput type="password" placeholder="Enter a password..." value={password} onChange={(e) => setPassword(e.target.value)} />
// //           </InputWithLabel>
// //         </div>
// //         <p className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm">
// //           Forgot password?
// //         </p>
// //         <WhiteButton
// //           link="/"
// //           textSize="lg"
// //           width="full"
// //           py="2"
// //           text="Login now"
// //         ></WhiteButton>
// //         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
// //           Not registered yet?{" "}
// //           <Link
// //             to="/register"
// //             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
// //           >
// //             Register <FaArrowRight className="mt-[2px]" />
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }
// // export default LoginComponent




// import { FaReact, FaArrowRight } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import ThirdPartyAuthButton from "./ThirdPartyAuthButton";
// import InputWithLabel from "./InputWithLabel";
// import SimpleInput from "./SimpleInput";
// import WhiteButton from "./WhiteButton";
// import '../Pages/Login.css';
// import { loginUser } from '../services/apiService';

// const LoginComponent = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); 
//   const loginSubmit = async (e ?: any) => {
//     e.preventDefault(); 
//     // Ensure password and confirm password match
//     // Construct the data to send in the POST request
//     const data = {
//       email: email,
//       password: password,
//     };
//     try {
//       // Call the API service to register the user
//       const response = await loginUser(data); // Use the registerUser API call

//       // Handle success - Navigate to login or another page
//       console.log("User registered successfully:", response);

//       // Redirect to the login page after successful registration
//       navigate("/");
//     } catch (error) {
//       console.error("Error registering user:", error);

//     }
//   };
//   return (
//     <div className="login-container">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="react-icon" />

//         <div className="input-wrapper">
//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter a email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="simple-input"
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="simple-input"
//             />
//           </InputWithLabel>
//         </div>

//         <p className="forgot-password">Forgot password?</p>


//         <WhiteButton text="Login Now" type="submit" className="white-button"
//           onClick={loginSubmit}  />

//         <p className="register">
//           Not registered yet?{" "}
//           <Link to="/register" className="register-link">
//             Register <FaArrowRight className="arrow-icon" />
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;

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

