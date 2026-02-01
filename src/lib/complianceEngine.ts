export interface Action {
  employee_id: string;
  employee_name: string;
  action_type: string;
  action_payload: string;
  timestamp: string;
}

export interface PolicyCitation {
  section: string;
  text: string;
}

export interface ComplianceResponse {
  decision: 'ALLOW' | 'WARN' | 'BLOCK' | 'ESCALATE';
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  policy_citations: PolicyCitation[];
  reason: string;
  recommended_actions: string[];
  action: Action;
}

export interface DashboardAlert extends ComplianceResponse {
  id: string;
  employee: string;
  timestamp: string;
  status: 'pending' | 'reviewing' | 'resolved';
}

// Update the existing escalations array to hold these alerts
export const activeAlerts: DashboardAlert[] = [];

export function addAlertToDashboard(response: ComplianceResponse) {
  const newAlert: DashboardAlert = {
    ...response,
    id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
    employee: response.action.employee_name,
    timestamp: 'Just now',
    status: 'pending'
  };
  activeAlerts.unshift(newAlert);
}

// Mock compliance analysis engine
export function analyzeAction(action: Action): ComplianceResponse {
  const responses: Record<string, ComplianceResponse> = {
    export_customer_list: {
      decision: 'BLOCK',
      risk: 'CRITICAL',
      policy_citations: [
        {
          section: 'Data Privacy Policy § 4.2',
          text: 'Customer data exports require written authorization from Data Protection Officer and must be logged with business justification.'
        },
        {
          section: 'Acceptable Use Policy § 2.1',
          text: 'Bulk customer data downloads are prohibited without explicit approval from management and legal review.'
        }
      ],
      reason: 'Attempted unauthorized export of customer database. This action violates data privacy policies and poses significant risk of data breach. No approval workflow was initiated.',
      recommended_actions: [
        'Submit formal data access request through compliance portal',
        'Obtain written approval from Data Protection Officer',
        'Complete data handling training (required)',
        'Use approved secure transfer method if request is granted'
      ],
      action
    },
    external_share: {
      decision: 'ESCALATE',
      risk: 'HIGH',
      policy_citations: [
        {
          section: 'Information Security Policy § 3.4',
          text: 'Confidential files may only be shared externally through approved secure channels with encrypted transmission.'
        },
        {
          section: 'Data Classification Policy § 5.1',
          text: 'Files marked "Confidential" or higher require dual authorization for external sharing.'
        }
      ],
      reason: 'External file sharing detected without going through secure approval workflow. File appears to contain confidential information based on classification tags.',
      recommended_actions: [
        'Use approved secure file sharing platform (SecureShare Portal)',
        'Request authorization from your manager and compliance team',
        'Ensure recipient has signed NDA on file',
        'Apply appropriate DLP controls before sharing'
      ],
      action
    },
    post_sensitive_data: {
      decision: 'BLOCK',
      risk: 'CRITICAL',
      policy_citations: [
        {
          section: 'Data Privacy Policy § 6.3',
          text: 'Customer PII must never be posted in public or semi-public communication channels including Slack, Teams, or email distribution lists.'
        },
        {
          section: 'Acceptable Use Policy § 7.2',
          text: 'Sensitive data disclosure in public channels constitutes a reportable data breach incident.'
        }
      ],
      reason: 'Detected attempt to post customer personally identifiable information (PII) to a public Slack channel. This would constitute an immediate data breach under GDPR and other regulations.',
      recommended_actions: [
        'Delete draft message immediately',
        'Use secure internal case management system for customer discussions',
        'Anonymize data before sharing in group channels',
        'Complete mandatory data privacy refresher training'
      ],
      action
    },
    bypass_approval: {
      decision: 'WARN',
      risk: 'MEDIUM',
      policy_citations: [
        {
          section: 'Internal Controls Policy § 8.1',
          text: 'All financial transactions above $5,000 require dual authorization through the approval workflow system.'
        }
      ],
      reason: 'Attempted to bypass standard approval workflow for a transaction that requires manager authorization. While not an immediate breach, this circumvents internal controls.',
      recommended_actions: [
        'Submit request through proper approval channel',
        'Wait for manager authorization before proceeding',
        'Document business justification for expedited processing if urgent'
      ],
      action
    },
    access_restricted: {
      decision: 'ESCALATE',
      risk: 'HIGH',
      policy_citations: [
        {
          section: 'Access Control Policy § 2.5',
          text: 'Users may only access data commensurate with their role and clearance level. Unauthorized access attempts are logged and reviewed.'
        },
        {
          section: 'Code of Conduct § 4.7',
          text: 'Attempting to access systems or data beyond your authorization level may result in disciplinary action.'
        }
      ],
      reason: 'User attempted to access data classified above their clearance level (Confidential access with Standard clearance). This triggers automatic escalation and audit review.',
      recommended_actions: [
        'Request proper access elevation through IT Security team',
        'Provide business justification for access requirement',
        'Obtain manager approval for clearance upgrade',
        'Await security review before retrying access'
      ],
      action
    }
  };

  return responses[action.action_type] || {
    decision: 'ALLOW',
    risk: 'LOW',
    policy_citations: [],
    reason: 'Action analyzed and found to be compliant with current policies.',
    recommended_actions: ['Continue with action', 'Ensure proper documentation'],
    action
  };
}

// Store escalations for dashboard
export const escalations: ComplianceResponse[] = [];

export function addEscalation(response: ComplianceResponse) {
  escalations.unshift(response);
}
