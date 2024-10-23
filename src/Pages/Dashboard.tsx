
import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"


const HomeLayout = () => {
  const location = useLocation();
  const currentRoute = location.pathname.replaceAll('/','');
  return (
    <>
    {currentRoute !== 'EventForm' && (<Header />)}
    
    <Outlet />
    
    
    
    </>
  )
}
export default HomeLayout