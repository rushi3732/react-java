import React, { useState, useMemo } from "react";
import BillingDashboard from "./BillingDashboard";
import InventoryDashboard from "./InventoryDashboard";
import IPDDashboard from "./IPDDashboard";
import OPDDashboard from "./OPDDashboard";
import PurchaseDashboard from "./PurchaseDashboard";
import {
  IPDIcon,
  OPDIcon,
  InventoryIcon,
  BillingIcon,
  PurchaseIcon,
  OTIcon,
  PharmacyIcon,
  AssetIcon,
  PathologyIcon,
  RadiologyIcon,
  FeedbackIcon,
  AnalyticsIcon,
} from "../../Common Components/assets/ipdassets/Dashboard/DashboardIcons";
import PharmacyDashboard from "./PharmacyDashboard";
import PathologyDashboard from "./PathologyDashboard";
import RadiologyDashboard from "./RadiologyDashboard";
import FeedbackDashboard from "./FeedbackDashboard";
import AssetDashboard from "./AssetDashboard";
import OTDashboard from "./OTDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("OPD");

  const generateDynamicTabs = () => {
    return [
      { id: 1, title: "OPD", bgColor: "bg-[#FDFFE9]", icon: <OPDIcon /> },

      { id: 2, title: "IPD", bgColor: "bg-[#EEFFD9]", icon: <IPDIcon /> },
      {
        id: 3,
        title: "Billing",
        bgColor: "bg-[#FFD7CB]",
        icon: <BillingIcon />,
      },
      {
        id: 4,
        title: "Inventory",
        bgColor: "bg-cyan-200",
        icon: <InventoryIcon />,
      },
      {
        id: 5,
        title: "Purchase",
        bgColor: "bg-[#E7D4FF]",
        icon: <PurchaseIcon />,
      },
      { id: 6, title: "OT", bgColor: "bg-yellow-100", icon: <OTIcon /> },
      {
        id: 7,
        title: "Pharmacy",
        bgColor: "bg-green-200",
        icon: <PharmacyIcon />,
      },
      {
        id: 8,
        title: "Pathology",
        bgColor: "bg-[#FDEBDA]",
        icon: <PathologyIcon />,
      },
      {
        id: 9,
        title: "Radiology",
        bgColor: "bg-sky-100",
        icon: <RadiologyIcon />,
      },
      {
        id: 10,
        title: "Feedback",
        bgColor: "bg-[#EEFFD9]",
        icon: <FeedbackIcon />,
      },
      { id: 11, title: "Asset", bgColor: "bg-[#FFD1D1]", icon: <AssetIcon /> },
      {
        id: 11,
        title: "Analytics",
        bgColor: "bg-[#FFD1D1]",
        icon: <AnalyticsIcon />,
      },
    ];
  };

  const totalTab = useMemo(() => generateDynamicTabs(), []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab.title);
  };

  return (
    <div className="mt-2">
      {/* Tab navigation */}
      <div className="grid  grid-cols-4 md:grid-cols-6 lg:grid-cols-12 md:gap-4  gap-2">
        {totalTab.map((tab) => (
          <div key={tab.id} className="text-center">
            <div
              onClick={() => handleTabClick(tab)}
              className={` p-1 md:p-3 flex justify-center rounded-lg  cursor-pointer shadow-md   ${
                selectedTab === tab.title
                  ? " border-blue-800 bg-sky-100  scale-105 border  transition duration-300 ease-in-out transform -translate-y-1"
                  : "text-black  border-[#D0D0D0] bg-[#FDFFE9] bg-transparent  border"
              }`}
            >
              {tab.icon}
            </div>
            <div
              onClick={() => handleTabClick(tab)}
              className={`mt-2  bg-white cursor-pointer  rounded-full ${
                selectedTab === tab.title
                  ? "bg-transparent font-[600] text-sm  leading-4  text-blue-800"
                  : "text-black  font-[600] text-xs "
              }`}
            >
              {tab.title}
            </div>
          </div>
        ))}
      </div>
      <div className="border-b mt-2 mb-2 shodow-sm border-[#B3B3B3] shadow-md "></div>
      {/* Render content based on the selected tab */}
      {selectedTab === "Billing" && <BillingDashboard />}
      {selectedTab === "Inventory" && <InventoryDashboard />}
      {selectedTab === "IPD" && <IPDDashboard />}
      {selectedTab === "OPD" && <OPDDashboard />}
      {selectedTab === "Pharmacy" && <PharmacyDashboard />}
      {selectedTab === "Pathology" && <PathologyDashboard />}
      {selectedTab === "Radiology" && <RadiologyDashboard />}
      {selectedTab === "Purchase" && <PurchaseDashboard />}
      {selectedTab === "OT" && <OTDashboard />}
      {selectedTab === "Feedback" && <FeedbackDashboard />}
      {selectedTab === "Asset" && <AssetDashboard />}
      {selectedTab === "Analytics" && <AnalyticsDashboard />}
    </div>
  );
};

export default Dashboard;
