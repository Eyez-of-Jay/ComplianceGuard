import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">Access Denied</h1>
        <p className="text-slate-600 mb-2">
          You do not have permission to access this page.
        </p>
        <p className="text-sm text-slate-500 mb-8">
          This area is restricted to Compliance Officers with Admin clearance level.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 text-left">
              <strong>Need access?</strong> Contact your Compliance Officer or IT Security team to request elevated privileges.
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Staff Interface
        </Link>
      </div>
    </div>
  );
}
