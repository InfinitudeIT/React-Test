
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiLogin,
  HiOutlineHome,
  HiUserGroup,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import "../../src/sidebar.css";
import { useEventContext } from './EventContext'; // Import the context

const Sidebar: React.FC = () => {
  const { selectedEvents } = useEventContext() || {}; // Use context to get selected events
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navActiveClass = "nav-link nav-link-active";
  const navInactiveClass = "nav-link nav-link-inactive";

  return (
    <div className="">
      <div className="sidebar">
        <div className="sidebar_Inner">
          <ul>
            <li>
              <NavLink
                to="/"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineHome className="icon me-2" />
                <span className="nav-text">Overview</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/events"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="nav-text">Events</span>
              </NavLink>
              {selectedEvents?.checkedEvents?.length > 0 ? (
                <div className="Evnt_list">
                  {selectedEvents?.checkedEvents.map((event: any) => (
                    <ul key={event.id}>
                      <strong>{event.event_name}</strong>
                      <li>
                        <NavLink to="/events">
                          <span className="nav-text">Overview</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/reg-overview">
                          <span className="nav-text">Registrations</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-overview">
                          <span className="nav-text">Forms</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-design">
                          <span className="nav-text">Designs</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-lunch">
                          <span className="nav-text">Lunch/Dinner</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-lunch">
                          <span className="nav-text">Kit</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-lunch">
                          <span className="nav-text">Scanner</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/form-lunch">
                          <span className="nav-text">Event Settings</span>
                        </NavLink>
                      </li>
                    </ul>
                  ))}
                </div>
              ) : (
                <p className="NoEvnts">No events selected.</p>
              )}
            </li>


            <li
              onClick={() => setIsAuthOpen(!isAuthOpen)}
              className="nav-link nav-link-inactive"
            >
              <HiUserGroup className="icon me-2" />
              <span className="nav-text">Account</span>
            </li>
            {isAuthOpen && (
              <li>
                <NavLink
                  to="/login"
                  className={(isActiveObj) =>
                    isActiveObj.isActive ? navActiveClass : navInactiveClass
                  }
                >
                  <HiLogin className="icon me-2" />
                  <span className="nav-text">Settings</span>
                </NavLink>
              </li>
            )}
            <li className="nav-section">
              <NavLink
                to="/help-desk"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiOutlineInformationCircle className="icon me-2" />
                <span className="nav-text">Help Desk</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
