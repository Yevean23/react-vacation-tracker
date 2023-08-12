import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import LoginPage from './pages/login/Login';
import AdminPage from './pages/admin/admin';
import React from 'react';
import EmployeesPage from './pages/employees/employees';
import TrackerPage from './pages/tracker/tracker';
import ConfigPage from './pages/config/config';
import App from './App';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        Component: LoginPage,
      },
      {
        path: "/admin",
        Component : AdminPage,
      },
      {
        path: "/employees",
        Component : EmployeesPage,
      },
      {
        path: "/tracking",
        Component : TrackerPage,
      },
      {
        path: "/config",
        Component : ConfigPage,
      }
    ]


  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
