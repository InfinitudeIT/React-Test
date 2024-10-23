import React, { useState } from "react";
import "../../src/Registration_overview.css";
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar";

function RegistrationOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const attendees = [
    { name: "Satyam Vatsa", phone: " ", mode: "Onsite" },
    { name: "Khushal Hirani", phone: " ", mode: "Onsite" },
    { name: "Harsh Bacchani", phone: " ", mode: "Online" },
    { name: "Ahmad Butt", phone: " ", mode: "Uploaded" },
  ];

  const handleSearch = (e?: any) => {
    setSearchTerm(e.target.value);
  };
  const handleCreateEvent = () => {
    navigate('/reg-new'); // Navigate to the "Create Event" route
  };

  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div className="registration-overview">
            <div className="d-flex align-items-center justify-content-between bdr_btm">
              <h2 className="page-title-heading">Registration Overview</h2>
              <button className="btn" onClick={handleCreateEvent} >Add New</button>
            </div>

            <div className="row mt-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="search-input form-control"
                  placeholder="Name/Phone no"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="col-md-8 text-end">
                <button className="btn">Search</button>
              </div>


            </div>

            <div className="tabs-controls-wrapper">
              <div className="tabs">
                <span className="tab active">All (80)</span>
                <span className="tab">Online (50)</span>
                <span className="tab">Onsite (20)</span>
                <span className="tab">Uploaded (10)</span>
              </div>
              <div className="controls">
                <span>Edit this form</span>&nbsp;
                <span>Preview form</span>&nbsp;
                <span>Export All</span>&nbsp;
                <span>Delete All</span>
              </div>
            </div>

            <div className="table_format">
              <table className="table table-striped registration-table mt-3">
                <thead className="table-dark">
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Mode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" /></td>
                      <td>{attendee.name}</td>
                      <td>{attendee.phone}</td>
                      <td>{attendee.mode}</td>
                      <td>
                        <button className="view-btn">👁️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RegistrationOverview;
