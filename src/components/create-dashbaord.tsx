import React from 'react';
import '../../src/create-dashbaord.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function Create() {
  const navigate = useNavigate(); // Initialize useHistory

  // Function to handle navigation
  const navigateToCreateEvent = () => {
    navigate("/create-event");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="clientName">👤 Client Name</div>
        <ul className="menu">
          <li>Overview</li>
          <li className="activeMenuItem">Events</li>
          <ul className="subMenu">
            <li>Overview</li>
            <li>Registrations</li>
            <li>Forms</li>
            <li>Designs</li>
            <li>Lunch/Dinner</li>
            <li>Kit</li>
            <li>Scanner</li>
            <li>Event Settings</li>
          </ul>
          <li>Account</li>
          <li>Users</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="top-nav">
          <h3>Dashboards</h3>
          <div className="search-create">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="Event">
          <h4>
            Events
            <button className="create-btn" onClick={navigateToCreateEvent}>Create new Event</button> {/* Add onClick event */}
          </h4>
        </div>

        <button className="trash-btn">🗑️ Trash</button>
        <div className="events">
          <table className="events-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" /> Media Expo
                </td>
                <td>
                  <button className="edit-btn">✏️</button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" /> Print Expo Chennai
                </td>
                <td>
                  <button className="edit-btn">✏️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Create;
