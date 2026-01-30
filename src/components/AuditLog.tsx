import { FileText, Download, Filter } from 'lucide-react';

const mockAuditEntries = [
  {
    id: 'AUD-19472',
    timestamp: '2026-01-30T14:23:15Z',
    employee: 'Sarah Johnson (EMP-4729)',
    action: 'Export Customer List',
    decision: 'BLOCK',
    risk: 'CRITICAL',
    policy: 'Data Privacy Policy § 4.2',
    officer: 'System Automated'
  },
  {
    id: 'AUD-19471',
    timestamp: '2026-01-30T14:15:42Z',
    employee: 'Michael Chen (EMP-3821)',
    action: 'Share File Externally',
    decision: 'ESCALATE',
    risk: 'HIGH',
    policy: 'Information Security § 3.4',
    officer: 'Jane Wilson'
  },
  {
    id: 'AUD-19470',
    timestamp: '2026-01-30T14:08:33Z',
    employee: 'Emma Rodriguez (EMP-5129)',
    action: 'Access Restricted Data',
    decision: 'ESCALATE',
    risk: 'HIGH',
    policy: 'Access Control § 2.5',
    officer: 'Jane Wilson'
  },
  {
    id: 'AUD-19469',
    timestamp: '2026-01-30T13:52:18Z',
    employee: 'David Kim (EMP-2847)',
    action: 'Bypass Approval Flow',
    decision: 'WARN',
    risk: 'MEDIUM',
    policy: 'Internal Controls § 8.1',
    officer: 'System Automated'
  },
  {
    id: 'AUD-19468',
    timestamp: '2026-01-30T13:41:07Z',
    employee: 'Lisa Park (EMP-6234)',
    action: 'Post Sensitive Data',
    decision: 'BLOCK',
    risk: 'CRITICAL',
    policy: 'Data Privacy § 6.3',
    officer: 'System Automated'
  },
  {
    id: 'AUD-19467',
    timestamp: '2026-01-30T13:28:54Z',
    employee: 'James Taylor (EMP-4512)',
    action: 'External Share',
    decision: 'WARN',
    risk: 'MEDIUM',
    policy: 'Information Security § 3.4',
    officer: 'System Automated'
  },
  {
    id: 'AUD-19466',
    timestamp: '2026-01-30T13:15:29Z',
    employee: 'Maria Garcia (EMP-7891)',
    action: 'Export Customer List',
    decision: 'ESCALATE',
    risk: 'CRITICAL',
    policy: 'Data Privacy § 4.2',
    officer: 'Robert Martinez'
  },
  {
    id: 'AUD-19465',
    timestamp: '2026-01-30T12:58:11Z',
    employee: 'Kevin Wong (EMP-3156)',
    action: 'Access Restricted Data',
    decision: 'BLOCK',
    risk: 'HIGH',
    policy: 'Access Control § 2.5',
    officer: 'System Automated'
  }
];

export function AuditLog() {
  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskBadge = (risk: string) => {
    const styles = {
      CRITICAL: 'bg-red-100 text-red-700 border-red-200',
      HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
      MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      LOW: 'bg-green-100 text-green-700 border-green-200'
    };
    return styles[risk as keyof typeof styles] || styles.MEDIUM;
  };

  const getDecisionBadge = (decision: string) => {
    const styles = {
      BLOCK: 'bg-red-50 text-red-700',
      ESCALATE: 'bg-purple-50 text-purple-700',
      WARN: 'bg-orange-50 text-orange-700',
      ALLOW: 'bg-green-50 text-green-700'
    };
    return styles[decision as keyof typeof styles] || styles.ALLOW;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Audit Log</h2>
        <p className="text-slate-600">
          Complete audit trail of all compliance actions and decisions.
        </p>
      </div>

      {/* Filters & Export */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Filters:</span>
          </div>
          
          <select className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Risk Levels</option>
            <option>Critical Only</option>
            <option>High & Critical</option>
          </select>

          <select className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Decisions</option>
            <option>Blocked</option>
            <option>Escalated</option>
            <option>Warned</option>
          </select>

          <select className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>

          <div className="ml-auto">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Audit ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Decision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Reviewed By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockAuditEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">{entry.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{formatTimestamp(entry.timestamp)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900">{entry.employee}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{entry.action}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{entry.policy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDecisionBadge(entry.decision)}`}>
                      {entry.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadge(entry.risk)}`}>
                      {entry.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{entry.officer}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing <strong>1-8</strong> of <strong>247</strong> entries
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Export Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>Audit Trail Compliance:</strong> All actions are logged with immutable timestamps and cryptographic 
            signatures. Logs are retained for 7 years per regulatory requirements and can be exported for legal review.
          </div>
        </div>
      </div>
    </div>
  );
}
