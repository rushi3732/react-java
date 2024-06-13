import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import AllergiesComplaints from "./AllergiesComplaints";
import { EMRContext } from "./EMRContext"; // Import the context
import Historylifestyle from "./Historylifestyle";
import Notes from "./Notes";
import SystemicExamination from "./SystemicExamination";
import TreatmentOfIndexCancer from "./TreatmentOfIndexCancer";
import GeneralExaminationTab from "./GeneralExamination";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  {
    id: 0,
    title: "Allergies & Complaints",
    component: <AllergiesComplaints />,
  },
  {
    id: 1,
    title: "Treatment Of Index Cancer",
    component: <TreatmentOfIndexCancer />,
  },
  {
    id: 2,
    title: "History & lifestyle",
    component: <Historylifestyle />,
  },
  { id: 3, title: "Systemic Examination", component: <SystemicExamination /> },

  { id: 4, title: "General Examination", component: <GeneralExaminationTab /> },
  { id: 5, title: "Notes", component: <Notes /> },
];

function OncologyEMRTab({ drawerOpen }) {
  const { currentTab, setCurrentTab } = useContext(EMRContext); // Consume the context

  const handleChangeTabs = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="mt-2 pl-3">
      {/* Tab navigation */}
      <div className="flex rounded  bg-[#F7F9FB] gap-4 sticky top-0 z-50">
        <Tabs
          className="text-left font-semibold"
          onChange={handleChangeTabs}
          value={currentTab}
          variant="scrollable"
          scrollButtons
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.title} {...tabProps(tab.id)} />
          ))}
        </Tabs>
      </div>

      {/* Render tab content */}
      <div className="">
        {tabs.map((tab) => (
          <TabPanel
            key={tab.id}
            value={currentTab}
            index={tab.id}
            style={{ padding: "0 !important" }}
          >
            {tab.component}
          </TabPanel>
        ))}
        <style>
          {`
               .css-19kzrtu {
                 padding: 0;
               }
               .css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root{
                 width:20
               }
               .css-wvwga8-MuiButtonBase-root-MuiTab-root{
                padding:  7 26
               }
               .css-wvwga8-MuiButtonBase-root-MuiTab-root{
                text-transform: none;
               }
          `}
        </style>
      </div>
    </div>
  );
}

export default OncologyEMRTab;
