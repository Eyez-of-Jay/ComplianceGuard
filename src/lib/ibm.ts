// src/lib/ibm.ts

/**
 * Initiates a run with the watsonx Orchestrate agent.
 * Uses a local proxy to bypass CORS restrictions.
 */
export async function callComplianceAgent(userInput: string, threadId?: string) {
  // 1. Get IAM Token via the local proxy defined in vite.config.ts
  const tokenRes = await fetch("/ibm-auth/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${import.meta.env.VITE_IBM_CLOUD_API_KEY}`,
  });

  const tokenJson = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error("IAM Token Error:", tokenJson);
    throw new Error(tokenJson?.error_description || "Token request failed");
  }

  const access_token = tokenJson.access_token;

  // 2. Call the Agent Run endpoint via the orchestrate proxy
  // Note: Using the Instance ID from your .env to build the correct path
  const response = await fetch(
    `/ibm-orchestrate/instances/${import.meta.env.VITE_WATSONX_INSTANCE_ID}/v1/orchestrate/runs`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        agent_id: import.meta.env.VITE_WATSONX_AGENT_ID,
        thread_id: threadId,
        message: { 
          role: "user", 
          content: userInput 
        }
      }),
    }
  );

  const runData = await response.json();

  if (!response.ok) {
    console.error("Orchestrate API Error:", runData);
    throw new Error(runData?.message || "Agent execution failed");
  }

  // Check if we received the necessary run_id for polling
  if (!runData.run_id) {
    throw new Error("No run_id received from Agent. Check your Agent ID and status.");
  }

  // Return both the run metadata and the token so the UI can start polling
  return { runData, access_token };
}

/**
 * Polls the agent run status until completion and retrieves the final message.
 */
export async function waitForAgentResult(runId: string, accessToken: string) {
  const runUrl = `/ibm-orchestrate/instances/${import.meta.env.VITE_WATSONX_INSTANCE_ID}/v1/orchestrate/runs/${runId}`;
  
  let status = "pending";
  let runStatusData;

  while (status === "pending" || status === "running") {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const res = await fetch(runUrl, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    runStatusData = await res.json();
    status = runStatusData.status;
  }

  const threadId = runStatusData.thread_id;
  const messageRes = await fetch(
    `/ibm-orchestrate/instances/${import.meta.env.VITE_WATSONX_INSTANCE_ID}/v1/orchestrate/threads/${threadId}/messages`,
    { headers: { "Authorization": `Bearer ${accessToken}` } }
  );
  
  const messages = await messageRes.json();
  
  // FIX: Find the latest 'assistant' message in the array
  const assistantMessages = messages.filter((m: any) => m.role === 'assistant');
  const finalMessage = assistantMessages[assistantMessages.length - 1];

  console.log("Final Assistant Message:", finalMessage);

  if (!finalMessage || !finalMessage.content || !finalMessage.content[0]) {
    throw new Error("AI Agent did not return a valid message content.");
  }

  return finalMessage;
}