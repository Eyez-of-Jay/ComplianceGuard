// src/lib/ibm.ts
export async function callComplianceAgent(userInput: string) {
  // 1. Get the Token (The "Secret Handshake" with IBM)
  const tokenResponse = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${import.meta.env.VITE_IBM_CLOUD_API_KEY}`,
  });
  const { access_token } = await tokenResponse.json();

  // 2. Send the message to your Orchestrated Agents
  const response = await fetch(`${import.meta.env.VITE_WATSONX_URL}/v1/orchestrate/runs`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: import.meta.env.VITE_WATSONX_AGENT_ID,
      message: { role: "user", content: userInput }
    }),
  });

  return response.json();
}