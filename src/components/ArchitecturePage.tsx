import { Network, Zap, Database, Shield, Eye, AlertCircle, FileCheck } from 'lucide-react';

const agents = [
  {
    name: 'Intent Agent',
    icon: Eye,
    description: 'Analyzes and interprets staff actions to understand intent and context',
    ibmTool: 'watsonx.ai - Granite Model',
    color: 'blue'
  },
  {
    name: 'Policy Retrieval Agent',
    icon: FileCheck,
    description: 'Searches and retrieves relevant policy clauses from knowledge base',
    ibmTool: 'Watson Discovery + Vector DB',
    color: 'purple'
  },
  {
    name: 'Compliance Decision Agent',
    icon: Shield,
    description: 'Evaluates action against policy and determines compliance status',
    ibmTool: 'watsonx Agent Builder',
    color: 'green'
  },
  {
    name: 'Risk Scoring Agent',
    icon: AlertCircle,
    description: 'Calculates risk severity based on potential impact and likelihood',
    ibmTool: 'watsonx.ai - Custom Scoring',
    color: 'orange'
  },
  {
    name: 'Escalation Agent',
    icon: Zap,
    description: 'Triggers automated workflows and notifications based on decision',
    ibmTool: 'watsonx Orchestrate',
    color: 'red'
  }
];

const integrations = [
  { name: 'Slack / Microsoft Teams', type: 'Communication' },
  { name: 'ServiceNow / Jira', type: 'Ticketing' },
  { name: 'Google Workspace / M365', type: 'Productivity' },
  { name: 'SIEM / Security Tools', type: 'Security' }
];

export function ArchitecturePage() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      red: 'bg-red-50 text-red-600 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">System Architecture</h2>
        <p className="text-slate-600">
          How ComplianceGuard AI leverages IBM Watson tools for agentic compliance enforcement.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Agentic AI Architecture</h3>
            <p className="text-slate-700 leading-relaxed">
              ComplianceGuard uses a <strong>multi-agent system</strong> orchestrated through IBM watsonx Orchestrate. 
              Each staff action triggers a workflow where specialized AI agents collaborate to analyze, evaluate, and 
              respond to potential compliance violations in real-time. The system is <strong>autonomous, proactive, 
              and action-oriented</strong>—not just a passive chatbot.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
        <h3 className="font-semibold text-slate-900 mb-6">Processing Flow</h3>
        
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900 mb-1">Staff Action Captured</div>
              <div className="text-sm text-slate-600">
                User attempts an action (export data, share file, etc.) → System intercepts event
              </div>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded text-xs text-slate-600">
                Integration: Workspace APIs, Event Webhooks
              </div>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-slate-200 h-8"></div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900 mb-1">Orchestrate Workflow Triggered</div>
              <div className="text-sm text-slate-600">
                watsonx Orchestrate receives event and initiates multi-agent analysis pipeline
              </div>
              <div className="mt-2 inline-block px-3 py-1 bg-blue-100 rounded text-xs text-blue-700 font-medium">
                IBM watsonx Orchestrate
              </div>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-slate-200 h-8"></div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900 mb-1">AI Agents Collaborate</div>
              <div className="text-sm text-slate-600 mb-3">
                Five specialized agents work in sequence to analyze the action:
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {agents.slice(0, 3).map(agent => (
                  <div key={agent.name} className="text-xs px-2 py-1.5 bg-slate-50 border border-slate-200 rounded">
                    → {agent.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-slate-200 h-8"></div>

          {/* Step 4 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              4
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900 mb-1">Decision & Action</div>
              <div className="text-sm text-slate-600">
                System executes decision (ALLOW, WARN, BLOCK, ESCALATE) and triggers appropriate workflows
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Notify User</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Alert Compliance</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Create Ticket</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">Log Audit Trail</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents */}
      <div className="mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">Specialized AI Agents</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className={`w-10 h-10 rounded-lg ${getColorClasses(agent.color)} border flex items-center justify-center mb-3`}>
                <agent.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{agent.name}</h4>
              <p className="text-sm text-slate-600 mb-3">{agent.description}</p>
              <div className="text-xs font-medium text-blue-600">
                {agent.ibmTool}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IBM Tools Stack */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">IBM Watson Technology Stack</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="font-medium text-blue-900 mb-2">watsonx.ai</div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Granite foundation models for NLP</li>
              <li>• Custom fine-tuning on policy documents</li>
              <li>• Risk scoring and decision logic</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="font-medium text-purple-900 mb-2">watsonx Agent Builder</div>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Agent configuration and orchestration</li>
              <li>• Tool/function calling capabilities</li>
              <li>• Structured output schemas</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="font-medium text-green-900 mb-2">watsonx Orchestrate</div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Workflow automation and routing</li>
              <li>• Integration with enterprise systems</li>
              <li>• Action triggering and notifications</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="font-medium text-orange-900 mb-2">Watson Discovery</div>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Policy document indexing</li>
              <li>• Semantic search for relevant clauses</li>
              <li>• Vector embeddings for RAG</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Integrations */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Enterprise System Integrations</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="p-3 border border-slate-200 rounded-lg">
              <div className="text-xs font-medium text-slate-500 mb-1">{integration.type}</div>
              <div className="text-sm text-slate-900">{integration.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600">
            <strong>Note:</strong> All integrations connect through watsonx Orchestrate using standard APIs, webhooks, 
            and enterprise connectors. Production deployment would include SSO, encrypted data transmission, and audit logging.
          </p>
        </div>
      </div>
    </div>
  );
}
