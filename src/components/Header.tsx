import '../../src/header.css';
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];

  return (
    currentRoute !== 'EventForm' ? (
      <div className="app_header">
        <div className="header1">
          <div className="dashboardIcon">📋 Dashboards</div>
          <div className="headerRight">
            <input type="text" placeholder="Search" className="searchInput form-control" />
            <div className="notificationButton ms-2">🔔</div>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  );
};

export default Header;
