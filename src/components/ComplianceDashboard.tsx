import { Shield, AlertTriangle, TrendingUp, Users, Activity, Clock } from 'lucide-react';

// Mock data for dashboard
const mockAlerts = [
  {
    id: 'CASE-9247',
    employee: 'Sarah Johnson',
    action: 'Export Customer List',
    risk: 'CRITICAL',
    timestamp: '2 minutes ago',
    status: 'pending'
  },
  {
    id: 'CASE-9243',
    employee: 'Michael Chen',
    action: 'Share File Externally',
    risk: 'HIGH',
    timestamp: '14 minutes ago',
    status: 'pending'
  },
  {
    id: 'CASE-9238',
    employee: 'Emma Rodriguez',
    action: 'Access Restricted Data',
    risk: 'HIGH',
    timestamp: '1 hour ago',
    status: 'reviewing'
  },
  {
    id: 'CASE-9227',
    employee: 'David Kim',
    action: 'Bypass Approval Flow',
    risk: 'MEDIUM',
    timestamp: '3 hours ago',
    status: 'resolved'
  }
];

const stats = [
  {
    label: 'Active Alerts',
    value: '12',
    change: '+3 from yesterday',
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    label: 'Critical Incidents',
    value: '3',
    change: '+1 from yesterday',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    label: 'Actions Monitored',
    value: '1,247',
    change: 'Last 24 hours',
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    label: 'Avg Response Time',
    value: '4.2m',
    change: '-15% improvement',
    icon: Clock,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

export function ComplianceDashboard() {
  const getRiskBadge = (risk: string) => {
    const styles = {
      CRITICAL: 'bg-red-100 text-red-700 border-red-200',
      HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
      MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      LOW: 'bg-green-100 text-green-700 border-green-200'
    };
    return styles[risk as keyof typeof styles] || styles.MEDIUM;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-purple-100 text-purple-700',
      reviewing: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Compliance Officer Dashboard</h2>
        <p className="text-slate-600">
          Monitor, review, and manage compliance alerts in real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-semibold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
            <div className="text-xs text-slate-400">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Recent Alerts & Escalations</h3>
          <p className="text-sm text-slate-500 mt-1">Review and take action on flagged activities</p>
        </div>

        <div className="divide-y divide-slate-200">
          {mockAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-slate-900">{alert.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getRiskBadge(alert.risk)}`}>
                      {alert.risk}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 mb-1">
                    <strong>{alert.employee}</strong> attempted: {alert.action}
                  </div>
                  <div className="text-xs text-slate-400">{alert.timestamp}</div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Review
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
              
              {/* Quick Actions */}
              {alert.status === 'pending' && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button className="text-xs text-slate-600 hover:text-slate-900">
                    View Details
                  </button>
                  <span className="text-slate-300">•</span>
                  <button className="text-xs text-slate-600 hover:text-slate-900">
                    Contact Employee
                  </button>
                  <span className="text-slate-300">•</span>
                  <button className="text-xs text-slate-600 hover:text-slate-900">
                    Escalate to Legal
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Risk Distribution (Last 7 Days)</h3>
          <div className="space-y-3">
            {[
              { level: 'Critical', count: 8, percentage: 12, color: 'bg-red-500' },
              { level: 'High', count: 23, percentage: 35, color: 'bg-orange-500' },
              { level: 'Medium', count: 31, percentage: 47, color: 'bg-yellow-500' },
              { level: 'Low', count: 4, percentage: 6, color: 'bg-green-500' }
            ].map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-700">{item.level}</span>
                  <span className="text-slate-500">{item.count} incidents</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Top Violation Types</h3>
          <div className="space-y-4">
            {[
              { type: 'Unauthorized Data Export', count: 15 },
              { type: 'External File Sharing', count: 12 },
              { type: 'Access Control Violation', count: 9 },
              { type: 'Approval Bypass', count: 7 },
              { type: 'Sensitive Data Exposure', count: 5 }
            ].map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <span className="text-sm text-slate-700">{item.type}</span>
                <span className="text-sm font-medium text-slate-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
