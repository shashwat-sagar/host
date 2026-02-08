import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientRegistration from "./pages/patient/PatientRegistration";
import PatientList from "./pages/PatientList";
import DoctorList from "./pages/DoctorList";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import HomeDemo from "./pages/Home/HomeDemo";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import PublicLayout from "./layout/PublicLayout";
import Login from "./pages/Login";
import DoctorRegistrationStepper from "./pages/doctor/DoctorRegistrationStepper";
import BasicInfoPatientRegistration from "./pages/patient/BasicInfoPatientRegistration";
import HospitalProfile from "./pages/hospital/HospitalProfile";
import BedComposition from "./pages/hospital/BedComposition";
import HospitalInfrastructure from "./pages/hospital/HospitalInfrastructure";
import HospitalSpecialization from "./pages/hospital/HospitalSpecialization";
import FinancialInformation from "./pages/hospital/FinancialInformation";
import CashlessService from "./pages/hospital/CashlessService";
import Corporate from "./pages/hospital/empanelled/Corporate";
import Insurance from "./pages/hospital/empanelled/Insurance";
import TPA from "./pages/hospital/empanelled/TPA";

const router = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <HomeDemo />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  },
  {
    path: "/auth",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "doctor-dashboard",
        element: <DoctorDashboard />
      },
      {
        path: "doctorlist",
        element:
          <DoctorList />
      },
      {
        path: "doctor-profile/:id",
        element: <DoctorProfile />
      },

      {
        path: "patientlist",
        element:
          <PatientList />
      },
      {
        path: "patientprofile",
        element: (

          <PatientProfile />

        ),
      },
      {
        path: "patientprofile/:id",
        element:
          <PatientProfile />
      },
      {
        path: "patientregister",
        element:
          <PatientRegistration />
      },
      {
        path: "patientregister-basic",
        element:
          <BasicInfoPatientRegistration />
      },
      {
        path: "doctorregister",
        element:
          <DoctorRegistrationStepper />
      },
      {
        path: "hospital-profile",
        element: <HospitalProfile />
      },
      {
        path: "bed-composition",
        element: <BedComposition />
      },
      {
        path: "hospital-infrastructure",
        element: <HospitalInfrastructure />
      },
      {
        path: "hospital-specialization",
        element: <HospitalSpecialization />
      },
      {
        path: "financial-information",
        element: <FinancialInformation />
      },
      {
        path: "cashless-service",
        element: <CashlessService />
      },
      {
        path: "empanelled-corporate",
        element: <Corporate />
      },
      {
        path: "empanelled-insurance",
        element: <Insurance />
      },
      {
        path: "empanelled-tpa",
        element: <TPA />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
];

export default createBrowserRouter(router);
