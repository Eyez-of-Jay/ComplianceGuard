import React, { createContext, useContext, useState } from "react";
import type { DashboardAlert, ComplianceResponse } from "./complianceEngine";

type AlertsContextType = {
  alerts: DashboardAlert[];
  addAlert: (response: ComplianceResponse) => void;
  updateStatus: (id: string, status: DashboardAlert["status"]) => void;
};

const AlertsContext = createContext<AlertsContextType | null>(null);

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);

  const addAlert = (response: ComplianceResponse) => {
    const newAlert: DashboardAlert = {
      ...response,
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      employee: response.action.employee_name,
      timestamp: "Just now",
      status: "pending",
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  const updateStatus = (id: string, status: DashboardAlert["status"]) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, updateStatus }}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const ctx = useContext(AlertsContext);
  if (!ctx) throw new Error("useAlerts must be used inside AlertsProvider");
  return ctx;
}
