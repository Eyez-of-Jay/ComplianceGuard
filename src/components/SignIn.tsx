import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, User, Lock, Building, IdCard } from 'lucide-react';
import { useAuth } from '../lib/authContext';

export function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loginAsAdmin, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      // Handle signup
      const success = signup(employeeId, name, department, password);
      if (success) {
        navigate('/');
      } else {
        setError('Employee ID already exists. Please use a different ID.');
      }
    } else {
      // Handle login
      let success = false;
      if (isAdminLogin) {
        success = loginAsAdmin(employeeId, password);
        if (success) {
          navigate('/compliance');
        } else {
          setError('Invalid admin credentials. Please try again.');
        }
      } else {
        success = login(employeeId, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid credentials. Please try again.');
        }
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setName('');
    setDepartment('');
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setError('');
    setEmployeeId('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">ComplianceGuard</h1>
          <p className="text-slate-600">Agentic Compliance Enforcement System</p>
        </div>

        {/* Sign In/Up Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">
              {isSignUp ? 'Create Account' : isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-slate-600">
              {isSignUp
                ? 'Register as a new staff member'
                : isAdminLogin
                ? 'Sign in with compliance officer credentials'
                : 'Sign in to access the system'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  Employee ID
                </div>
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g., EMP-4729"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Name (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Sarah Johnson"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}

            {/* Department (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Department
                  </div>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select department...</option>
                  <option value="Sales">Sales</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Legal">Legal</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </div>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up/Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New staff member? Sign Up'}
            </button>
          </div>

          {/* Admin Portal Toggle */}
          {!isSignUp && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-center">
              <button
                onClick={toggleAdminLogin}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                {isAdminLogin ? '← Back to Staff Login' : 'Compliance Officer? Access Admin Portal'}
              </button>
            </div>
          )}
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
          <p className="text-xs font-medium text-slate-700 mb-2">Demo Credentials:</p>
          <div className="text-xs text-slate-600 space-y-1">
            <div>
              <strong>Staff:</strong> EMP-4729 / password123
            </div>
            <div>
              <strong>Admin:</strong> EMP-0001 / admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
