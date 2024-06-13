import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../component/shared/Loadable";
import Dashboard from "../component/Dashboard/Dashboard";
import Register from "../Authorization/components/Register";
import Login from "../Authorization/components/Login";

/* ****layOut***** */
const DashBoard = Loadable(lazy(() => import("../Layout/DashBoard")));
const BlankLayout = Loadable(lazy(() => import("../Layout/BlankLayout")));

/* ****Pages***** */
const Home = Loadable(lazy(() => import("../component/Home")));
const Chart = Loadable(lazy(() => import("../component/Chart")));
const AccountList = Loadable(lazy(() => import("../component/AccountList")));
const Patient = Loadable(lazy(() => import("../component/Patient")));
const Donations = Loadable(lazy(() => import("../component/Donations")));
const BloodRequest = Loadable(lazy(() => import("../component/BloodRequest")));
const RequestHistory = Loadable(
  lazy(() => import("../component/RequestHistory"))
);
const BloodStock = Loadable(lazy(() => import("../component/BloodStock")));
const MultiStepForm = Loadable(
  lazy(() => import("../component/MultiStepForm/MultiStepForm"))
);
const WebCam = Loadable(lazy(() => import("../component/webcam")));
const OPDTreatmentRecord = Loadable(
  lazy(() => import("../component/PatientCareSystem//OPDTreatmentRecord"))
);

const ETUCaseSheet = Loadable(
  lazy(() => import("../component/PatientCareSystem/ETUCaseSheet"))
);

/* **** PageNotFound***** */
const PageNotFound = Loadable(
  lazy(() => import("../component/auth/PageNotFound"))
);

/* ****auth***** */

const Logout = Loadable(
  lazy(() => import("../Authorization/components/Logout"))
);

const Router = [
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      { path: "", exact: true, element: <Navigate to="/dashboard/home" /> },
      { path: "home", exact: true, element: <Dashboard /> },
      { path: "account", exact: true, element: <AccountList /> },
      { path: "chart", exact: true, element: <Chart /> },
      { path: "patient", exact: true, element: <Patient /> },
      { path: "donations", exact: true, element: <Donations /> },
      { path: "bloodRequest", exact: true, element: <BloodRequest /> },
      { path: "requesthistory", exact: true, element: <RequestHistory /> },
      { path: "bloodStock", exact: true, element: <Home /> },
      { path: "multiStepForm", exact: true, element: <MultiStepForm /> },
      { path: "webcam", exact: true, element: <WebCam /> },
      { path: "etuCasesheet", exact: true, element: <ETUCaseSheet /> },
      { path: "opdTR", exact: true, element: <OPDTreatmentRecord /> },
      { path: "*", exact: true, element: <PageNotFound /> },
    ],
  },
  { path: "/", element: <Navigate to="/auth/login" /> },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <PageNotFound /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/logOut", element: <Logout /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
