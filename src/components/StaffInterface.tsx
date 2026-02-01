import { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';
import { analyzeAction, type Action, type ComplianceResponse } from '../lib/complianceEngine';
import { useAuth } from '../lib/authContext';
import { callComplianceAgent, waitForAgentResult } from '../lib/ibm';

const ACTION_TYPES = [
  { value: 'export_customer_list', label: 'Export Customer List', description: 'Download customer database to CSV' },
  { value: 'external_share', label: 'Share File Externally', description: 'Share confidential file outside organization' },
  { value: 'post_sensitive_data', label: 'Post Sensitive Data', description: 'Post customer data to public channel' },
  { value: 'bypass_approval', label: 'Bypass Approval Flow', description: 'Skip required approval process' },
  { value: 'access_restricted', label: 'Access Restricted Data', description: 'View data above clearance level' },
];

export function StaffInterface() {
  const { user } = useAuth();
  const [selectedAction, setSelectedAction] = useState('');
  const [actionDetails, setActionDetails] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState<ComplianceResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setResponse(null); // Clear previous response

    try {
      // 1. Start the run and get the token used for it
      const { runData, access_token } = await callComplianceAgent(actionDetails);
      
      if (!runData.run_id) {
          throw new Error("No run_id received from Agent");
      }

      // 2. Poll using the run_id and the token we just received
      const finalMessage = await waitForAgentResult(runData.run_id, access_token);
      
      // 3. Parse and Display the real data
      // Note: Watson messages usually return text in finalMessage.content[0].text
      // You might need to JSON.parse() it if your agent returns a stringified JSON
      const aiContent = JSON.parse(finalMessage.content[0].text);
      setResponse(aiContent); 
      
    } catch (error) {
      console.error("Agent Integration Error:", error);
      // Optional: add a toast or error state here for the UI
    } finally {
      setIsAnalyzing(false);
    }
  };


  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return 'text-red-700 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'BLOCK': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'WARN': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'ESCALATE': return <Shield className="w-5 h-5 text-purple-600" />;
      case 'ALLOW': return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Staff Action Simulator</h2>
        <p className="text-slate-600">
          Simulate staff actions to see how ComplianceGuard AI evaluates and responds to potential policy violations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Simulate Action</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Action Type
                </label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an action...</option>
                  {ACTION_TYPES.map(action => (
                    <option key={action.value} value={action.value}>
                      {action.label}
                    </option>
                  ))}
                </select>
                {selectedAction && (
                  <p className="mt-2 text-sm text-slate-500">
                    {ACTION_TYPES.find(a => a.value === selectedAction)?.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={actionDetails}
                  onChange={(e) => setActionDetails(e.target.value)}
                  placeholder="e.g., File name, recipient email, data type..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !selectedAction}
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing with AI Agents...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Action
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600">
                <strong>Current User:</strong> {user?.name} ({user?.employeeId})<br />
                <strong>Department:</strong> {user?.department}<br />
                <strong>Clearance Level:</strong> {user?.clearanceLevel}
              </p>
            </div>
          </div>
        </div>

        {/* AI Response */}
        <div>
          {response ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">AI Analysis Complete</h3>
                  <p className="text-sm text-slate-500">
                    Processed by ComplianceGuard Agent
                  </p>
                </div>
                {getDecisionIcon(response.decision)}
              </div>

              {/* Decision */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Decision</label>
                <div className={`mt-2 px-4 py-3 rounded-lg border font-semibold ${
                  response.decision === 'BLOCK' ? 'bg-red-50 border-red-200 text-red-700' :
                  response.decision === 'WARN' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                  response.decision === 'ESCALATE' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                  'bg-green-50 border-green-200 text-green-700'
                }`}>
                  {response.decision}
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Risk Level</label>
                <div className={`mt-2 px-4 py-3 rounded-lg border font-semibold ${getRiskColor(response.risk)}`}>
                  {response.risk}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Reason</label>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {response.reason}
                </p>
              </div>

              {/* Policy Citations */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Policy Citations</label>
                <div className="mt-2 space-y-2">
                  {response.policy_citations.map((citation, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-xs font-medium text-slate-700 mb-1">{citation.section}</p>
                      <p className="text-xs text-slate-600">{citation.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Recommended Actions</label>
                <ul className="mt-2 space-y-2">
                  {response.recommended_actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Escalation Notice */}
              {response.decision === 'ESCALATE' && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-900 mb-1">
                    ⚡ Escalation Triggered
                  </p>
                  <p className="text-sm text-purple-700">
                    Compliance officer has been notified. Case #{Math.floor(Math.random() * 10000)} created.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-100 rounded-xl border border-slate-200 p-12 text-center">
              <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500">
                AI response will appear here after analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}