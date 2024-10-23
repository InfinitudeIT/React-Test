import React, { useState } from "react";
import "../../src/NewRegistration.css";
import Sidebar from "./Sidebar";

function NewRegistration() {
  const [formData, setFormData] = useState({
    name: "Sathyam Vastav",
    email: "sathyam@gmail.com",
    phone: "9876543210"
  });

  const handleChange = (e?: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e?: any) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div className="new-registration">
            <h2 className="page-title-heading">New Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="register-btn">
                Register now
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default NewRegistration;
