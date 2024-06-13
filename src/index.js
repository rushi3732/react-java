import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { DataProvider } from "./component/DataContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

root.render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Router>
            <ThemeProvider theme={theme}>
              <Typography className="css-z2eky3-MuiTypography-root">
                <DataProvider>
                  <App />
                </DataProvider>
              </Typography>
            </ThemeProvider>
          </Router>
        </StyledEngineProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
