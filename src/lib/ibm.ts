// src/lib/ibm.ts
export async function callComplianceAgent(userInput: string) {
  // 1. Get Token via the local proxy
  const tokenRes = await fetch("/ibm-auth/identity/token", { // Use the proxy path here
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${import.meta.env.VITE_IBM_CLOUD_API_KEY}`,
  });
  
  const { access_token } = await tokenRes.json();

  // 2. Call the Agent via the local proxy
  const response = await fetch("/ibm-orchestrate/instances/b2dffi45b9-b616-4b54-b1fb-bfbfa4ae4ad7/v1/orchestrate/runs", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      agent_id: import.meta.env.VITE_WATSONX_AGENT_ID,
      message: { role: "user", content: userInput }
    }),
  });

  return response.json();
}