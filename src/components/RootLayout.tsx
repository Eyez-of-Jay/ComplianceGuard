import { Outlet, Link, useLocation } from 'react-router';
import { Shield, Activity, Network, FileText } from 'lucide-react';

export function RootLayout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Staff Interface', icon: Activity },
    { path: '/compliance', label: 'Compliance Dashboard', icon: Shield },
    { path: '/audit', label: 'Audit Log', icon: FileText },
    { path: '/architecture', label: 'Architecture', icon: Network },
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
                <h1 className="font-semibold text-slate-900">ComplianceGuard AI</h1>
                <p className="text-xs text-slate-500">Agentic Compliance Enforcement System</p>
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
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
