import React, { createContext, useContext, useState } from "react";
import type { DashboardAlert, ComplianceResponse } from "./complianceEngine";

type AlertsContextType = {
  alerts: DashboardAlert[];
  addAlert: (response: ComplianceResponse) => void;
  updateStatus: (id: string, status: DashboardAlert["status"]) => void;
};

const AlertsContext = createContext<AlertsContextType | null>(null);

// Ensure all required properties from DashboardAlert/ComplianceResponse are present
const initialMockAlerts: DashboardAlert[] = [
  {
    id: 'CASE-9247',
    employee: 'Sarah Johnson',
    action: { 
      employee_id: 'EMP-001', 
      employee_name: 'Sarah Johnson', 
      action_type: 'export_customer_list', 
      action_payload: '', 
      timestamp: new Date().toISOString() 
    },
    risk: 'CRITICAL',
    decision: 'BLOCK',
    reason: 'Unauthorized export attempt.',
    policy_citations: [],
    recommended_actions: [],
    timestamp: '2 minutes ago',
    status: 'pending'
  },
  {
    id: 'CASE-9243',
    employee: 'Michael Chen',
    action: { 
      employee_id: 'EMP-002', 
      employee_name: 'Michael Chen', 
      action_type: 'external_share', 
      action_payload: '', 
      timestamp: new Date().toISOString() 
    },
    risk: 'HIGH',
    decision: 'ESCALATE',
    reason: 'Sensitive file shared externally.',
    policy_citations: [],
    recommended_actions: [],
    timestamp: '14 minutes ago',
    status: 'pending'
  }
];

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<DashboardAlert[]>(initialMockAlerts);

  const addAlert = (response: ComplianceResponse) => {
    const newAlert: DashboardAlert = {
      ...response,
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      employee: response.action.employee_name,
      timestamp: "Just now",
      status: "pending",
    };

    // Functional update ensures we prepend to the most current state
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