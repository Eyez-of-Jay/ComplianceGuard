import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./lib/authContext";
import { AlertsProvider } from "./lib/alertsContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AlertsProvider>
        <App />
      </AlertsProvider>
    </AuthProvider>
  </React.StrictMode>
);