import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Landing from "./Pages/Landing";
import EventForm from "./components/CreateEvent";
import EventList from "./components/EventList";
import RegistrationOverview from "./components/Registration_overview";
import NewRegistration from "./components/NewRegistration";
import FormsOverview from "./components/Client_forms";
import FormfieldsClient from "./components/Formfields_client";
import LunchSelection from "./components/Lunch_client";
import EmbeddedForm from "./components/EmbeddedForm/EmbeddedForm.js";
import CreateCustomForm from "./components/AddNew";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/events",
        element: <EventList />,
      },
      {
        path: "/create-event",
        element: <EventForm />,
      },
      {
        path: "/edit-event",
        element: <EventForm />,
      },
      {
        path: "/CreateForm",
        element: <CreateCustomForm />,
      },
      {
        path: "/EditForm",
        element: <CreateCustomForm />,
      },
      {
        path: "/EventForm",
        element: <CreateCustomForm />,
      },
      {
        path: "/reg-overview",
        element: <RegistrationOverview />,
      },
      {
        path: "/reg-new",
        element: <NewRegistration />,
      },
      {
        path: "/form-overview",
        element: <FormsOverview />,
      },
      {
        path: "/form-design",
        element: <FormfieldsClient />,
      },
      {
        path: "/form-lunch",
        element: <LunchSelection />,
      },
      {
        path: "/form/:encodedFormData", // Adding EmbeddedForm route
        element: <EmbeddedForm />,
      },
    ],
  },
]);

function App() {
  return (
   
      <RouterProvider router={router} />
   
  );
}

export default App;
