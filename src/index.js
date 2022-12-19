import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("#container");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
  <React.Fragment>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.Fragment>
  </React.StrictMode>
);