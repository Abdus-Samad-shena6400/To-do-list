import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TaskProvider from "./context/TaskProvider";
import ThemeProvider from "./context/ThemeProvider";
import AppWrapper from "./Component/AppWrapper";
import "./index.css";

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>  
      <TaskProvider>
        <AppWrapper />
      </TaskProvider>
    </ThemeProvider>
  </BrowserRouter>
);