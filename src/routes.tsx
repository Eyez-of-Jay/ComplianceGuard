import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { StaffInterface } from "./components/StaffInterface";
import { ComplianceDashboard } from "./components/ComplianceDashboard";
import { ArchitecturePage } from "./components/ArchitecturePage";
import { AuditLog } from "./components/AuditLog";
import { SignIn } from "./components/SignIn";
import { AccessDenied } from "./components/AccessDenied";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AboutPage } from "./components/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/access-denied",
    Component: AccessDenied,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        index: true, 
        element: (
          <ProtectedRoute>
            <StaffInterface />
          </ProtectedRoute>
        )
      },
      { 
        path: "about", 
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        )
      },
      { 
        path: "compliance", 
        element: (
          <ProtectedRoute requireAdmin>
            <ComplianceDashboard />
          </ProtectedRoute>
        )
      },
      { 
        path: "audit", 
        element: (
          <ProtectedRoute requireAdmin>
            <AuditLog />
          </ProtectedRoute>
        )
      },
    ],
  },
]);