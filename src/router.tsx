import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Theme from "./pages/Theme";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import PatientRegistration from "./pages/patient/PatientRegistration";

// Placeholder components for new routes
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-gray-500 mt-2">This page is under construction.</p>
  </div>
);

const router = [
  {
    path: "/",
    element: <AppLayout>
      <Dashboard />
    </AppLayout>,
  },
  {
    path: "/theme",
    element: <AppLayout>
      <Theme />
    </AppLayout>,
  },
  {
    path: "/projects",
    element: <AppLayout>
      <PlaceholderPage title="Projects" />
    </AppLayout>,
  },
  {
    path: "/activity",
    element: <AppLayout>
      <PlaceholderPage title="Activity" />
    </AppLayout>,
  },
  {
    path: "/team",
    element: <AppLayout>
      <PlaceholderPage title="Team" />
    </AppLayout>,
  },
  {
    path: "/settings/general",
    element: <AppLayout>
      <PlaceholderPage title="General Settings" />
    </AppLayout>,
  },
  {
    path: "/settings/security",
    element: <AppLayout>
      <PlaceholderPage title="Security Settings" />
    </AppLayout>,
  },
  {
    path: "/settings/notifications",
    element: <AppLayout>
      <PlaceholderPage title="Notification Settings" />
    </AppLayout>,
  },
  {
    path: "/patient/register",
    element: <AppLayout>
      <PatientRegistration />
    </AppLayout>,
  },
];

export default createBrowserRouter(router);
