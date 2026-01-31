// src/lib/ibm.ts
export async function callComplianceAgent(userInput: string) {
  // 1. Get Token (You've already tested this in Postman!)
  const tokenRes = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${import.meta.env.VITE_IBM_CLOUD_API_KEY}`,
  });
  const { access_token } = await tokenRes.json();

  // 2. Call the Agent Run endpoint
  const response = await fetch(`${import.meta.env.VITE_WATSONX_URL}/v1/orchestrate/runs`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      agent_id: import.meta.env.VITE_WATSONX_AGENT_ID,
      message: { 
        role: "user", 
        content: userInput 
      }
    }),
  });

  const data = await response.json();
  
  // NOTE: For 'Build' agents, the response structure usually has 'results' or 'output'
  console.log("Raw Agent Response:", data); 
  return {
  ...data,
  finalResult: data.results?.[0]?.value || data.output || data
};
}