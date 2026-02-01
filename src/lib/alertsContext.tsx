import React, { createContext, useContext, useState } from "react";
import type { DashboardAlert, ComplianceResponse } from "./complianceEngine";

type AlertsContextType = {
  alerts: DashboardAlert[];
  addAlert: (response: ComplianceResponse) => void;
  updateStatus: (id: string, status: DashboardAlert["status"]) => void;
};

const AlertsContext = createContext<AlertsContextType | null>(null);
const initialMockAlerts: DashboardAlert[] = [
  {
    id: 'CASE-9247',
    employee: 'Sarah Johnson',
    action: { 
      employee_id: 'EMP-001',
      employee_name: 'Sarah Johnson',
      action_type: 'export_customer_list',
      action_payload: 'Download customer database',
      timestamp: new Date().toISOString()
    },
    risk: 'CRITICAL',
    decision: 'BLOCK', // Added missing property
    reason: 'Attempted unauthorized export of customer database.', // Added missing property
    policy_citations: [ // Added missing property
      { section: 'Data Privacy § 4.2', text: 'Authorization required for exports.' }
    ],
    recommended_actions: ['Revoke data access'], // Added missing property
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
      action_payload: 'Shared project file',
      timestamp: new Date().toISOString()
    },
    risk: 'HIGH',
    decision: 'ESCALATE', // Added missing property
    reason: 'External file sharing detected.', // Added missing property
    policy_citations: [], // Added missing property
    recommended_actions: ['Security review'], // Added missing property
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

    setAlerts((prev) => {
      const updated = [newAlert, ...prev];
      console.log("Context State Updated. New Count:", updated.length); // DEBUG
      return updated;
    });
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
