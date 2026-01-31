import { Shield, Brain, Network, CheckCircle, Zap, Lock } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
          <Shield className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-4xl font-semibold text-slate-900 mb-4">
          About ComplianceGuard AI
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          An enterprise-grade agentic AI system that proactively identifies and prevents compliance violations in real-time, helping organizations maintain regulatory standards and protect sensitive data.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Multi-Agent AI System</h3>
          <p className="text-sm text-slate-600">
            Specialized AI agents work together to analyze intent, retrieve policies, assess risk, and orchestrate appropriate responses.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Real-Time Detection</h3>
          <p className="text-sm text-slate-600">
            Intercepts potentially risky actions before they occur, providing instant feedback and preventing compliance violations.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Complete Audit Trail</h3>
          <p className="text-sm text-slate-600">
            Maintains immutable logs of all actions, decisions, and policy citations for regulatory compliance and legal review.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-200 p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Powered by IBM Watson</h2>
        </div>
        
        <p className="text-slate-700 mb-6">
          ComplianceGuard leverages IBM's Watson AI Agent Builder and Watson Orchestrate to deliver enterprise-grade agentic AI capabilities:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Intent Agent:</strong>
              <span className="text-slate-600"> Understands and classifies staff action intent</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Policy Retrieval Agent:</strong>
              <span className="text-slate-600"> Searches and retrieves relevant policy documents</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Compliance Decision Agent:</strong>
              <span className="text-slate-600"> Evaluates actions against company policies</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Risk Scoring Agent:</strong>
              <span className="text-slate-600"> Assesses risk level and potential impact</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Escalation Agent:</strong>
              <span className="text-slate-600"> Orchestrates appropriate response workflows</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Watson Orchestrate:</strong>
              <span className="text-slate-600"> Coordinates multi-agent collaboration and workflows</span>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Protected Actions</h2>
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200">
          {[
            {
              title: 'Unauthorized Data Exports',
              description: 'Prevents bulk downloads of customer data without proper authorization and business justification.'
            },
            {
              title: 'External File Sharing',
              description: 'Blocks confidential file sharing outside the organization through unapproved channels.'
            },
            {
              title: 'Sensitive Data Exposure',
              description: 'Detects and prevents posting of PII or confidential information in public channels.'
            },
            {
              title: 'Access Control Violations',
              description: 'Identifies attempts to access data above employee clearance levels.'
            },
            {
              title: 'Approval Bypass',
              description: 'Enforces mandatory approval workflows for financial transactions and policy changes.'
            }
          ].map((useCase, idx) => (
            <div key={idx} className="p-6">
              <h3 className="font-semibold text-slate-900 mb-2">{useCase.title}</h3>
              <p className="text-sm text-slate-600">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Enterprise Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-2">For Organizations</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Reduce compliance violations by up to 85%</li>
              <li>• Prevent costly data breaches and regulatory fines</li>
              <li>• Maintain comprehensive audit trails for legal review</li>
              <li>• Automate compliance monitoring and enforcement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-900 mb-2">For Employees</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Receive real-time guidance on policy compliance</li>
              <li>• Understand proper procedures before taking action</li>
              <li>• Avoid accidental policy violations</li>
              <li>• Access clear documentation of compliance decisions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
