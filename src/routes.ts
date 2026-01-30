import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { StaffInterface } from "./components/StaffInterface";
import { ComplianceDashboard } from "./components/ComplianceDashboard";
import { ArchitecturePage } from "./components/ArchitecturePage";
import { AuditLog } from "./components/AuditLog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: StaffInterface },
      { path: "compliance", Component: ComplianceDashboard },
      { path: "architecture", Component: ArchitecturePage },
      { path: "audit", Component: AuditLog },
    ],
  },
]);
