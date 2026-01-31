import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router";
import {
  Shield,
  Activity,
  LogOut,
  User,
  Info,
} from "lucide-react";
import { useAuth } from "../lib/authContext";

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Navigation items based on user role
  const navItems = isAdmin
    ? [
        {
          path: "/compliance",
          label: "Compliance Dashboard",
          icon: Shield,
        },
        { path: "/audit", label: "Audit Log", icon: Activity },
        { path: "/about", label: "About", icon: Info },
      ]
    : [
        { path: "/", label: "Staff Interface", icon: Activity },
        { path: "/about", label: "About", icon: Info },
      ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">
                  ComplianceGuard AI
                </h1>
                <p className="text-xs text-slate-500">
                  Agentic Compliance Enforcement System
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <div className="text-sm font-medium text-slate-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user.employeeId} • {user.department} •{" "}
                    {user.clearanceLevel}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Session Info Bar (Mobile & Tablet) */}
        {user && (
          <div className="lg:hidden border-t border-slate-200 bg-slate-50 px-4 py-2">
            <p className="text-xs text-slate-600">
              <strong>Current User:</strong> {user.name} (
              {user.employeeId}) | <strong>Department:</strong>{" "}
              {user.department} | <strong>Clearance:</strong>{" "}
              {user.clearanceLevel}
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}