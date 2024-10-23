import { FaReact } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";
import '../../src/header.css'

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="app_header">
        {/* Header */}
        <div className="header1">
          <div className="dashboardIcon">📋 Dashboards</div>
          <div className="headerRight">
            <input type="text" placeholder="Search" className="searchInput form-control" />
            <div className="notificationButton ms-2">🔔</div>
          </div>
        </div>
        </div>
  );
};
export default Header;
