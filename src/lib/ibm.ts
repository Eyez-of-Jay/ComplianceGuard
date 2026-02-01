// src/lib/ibm.ts
export async function callComplianceAgent(userInput: string, threadId?: string) {
  const tokenRes = await fetch("/ibm-auth/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${import.meta.env.VITE_IBM_CLOUD_API_KEY}`,
  });

  const tokenJson = await tokenRes.json();

  if (!tokenRes.ok) {
    throw new Error(tokenJson?.error_description || "Token request failed");
  }

  const access_token = tokenJson.access_token;

  const response = await fetch(`/ibm-orchestrate/instances/${import.meta.env.VITE_WATSONX_INSTANCE_ID}/v1/orchestrate/runs`, {
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
  });

  const runData = await response.json();

  // RETURN BOTH THE DATA AND THE TOKEN
  return { runData, access_token };

}

// Helper function to wait for the agents to finish
export async function waitForAgentResult(runId: string, accessToken: string) {
  const url = `${import.meta.env.VITE_WATSONX_URL}/v1/orchestrate/runs/${runId}`;
  
  let status = "pending";
  let responseData;

  // Poll every 1 second until the status is no longer 'pending' or 'running'
  while (status === "pending" || status === "running") {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    responseData = await res.json();
    status = responseData.status;
  }

  // Once finished, get the final message from the thread
  const threadId = responseData.thread_id;
  const messageRes = await fetch(
    `${import.meta.env.VITE_WATSONX_URL}/v1/orchestrate/threads/${threadId}/messages`,
    { headers: { "Authorization": `Bearer ${accessToken}` } }
  );
  const messages = await messageRes.json();
  
  // Return the last message (the AI's final decision)
  return messages.data[0];
}