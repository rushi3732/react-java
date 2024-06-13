import React from "react";
import { FaHome, FaHospital, FaHistory, FaChartLine } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { BiDonateBlood } from "react-icons/bi";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { GiDrop } from "react-icons/gi";

const Menu = [
  {
    title: "Home",
    icon: <FaHome />,
    path: "/dashboard/home",
  },
  {
    title: "Account",
    icon: <BsFillPersonFill />,
    path: "/dashboard/account",
  },
  {
    title: "Chart",
    icon: <FaChartLine />,
    path: "/dashboard/chart",
  },
  {
    title: "Patient",
    icon: <MdOutlinePersonalInjury />,
    path: "/dashboard/patient",
  },
  {
    title: "Donations",
    icon: <FaHospital />,
    path: "/dashboard/donations",
  },
  {
    title: "Blood Requests",
    icon: <GiDrop />,
    path: "/dashboard/bloodrequest",
  },
  {
    title: "Request History",
    icon: <FaHistory />,
    path: "/dashboard/requesthistory",
  },
  {
    title: "Blood Bank",
    icon: <BiDonateBlood />,
    path: "/dashboard/bloodstock",
  },
  {
    title: "Project",
    icon: <BiDonateBlood />,
    subMenu: true,
    collapse: 1,
    submenuItems: [
      {
        title: "Master",
        subMenuChildren: true,
        submenuItemsChildren: [
          {
            title: "wizard",
            path: "/dashboard/multistepform",
          },
          {
            title: "ETU",
            path: "/dashboard/etuCasesheet",
          },
          {
            title: "OPD",
            path: "/dashboard/opdTR",
          },
        ],
      },
      {
        title: "Ub Master",
        subMenuChildren: true,
        submenuItemsChildren: [
          {
            title: "Web Cam",
            path: "/dashboard/webcam",
          },
          {
            title: " web Record",
            path: "/dashboard/webrecord",
          },
          {
            title: "web Histrory",
            path: "/dashboard/welHistory",
          },
        ],
      },
      {
        title: "Wizard Form",
        path: "dashboard/multistepform",
      },
    ],
  },
];

export default Menu;
