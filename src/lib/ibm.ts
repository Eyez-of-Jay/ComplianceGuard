export async function getIAMExtendedToken() {
  const res = await fetch("https://iam.cloud.ibm.com/identity/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${process.env.IBM_CLOUD_API_KEY}`,
  });
  const data = await res.json();
  return data.access_token; // This is your Bearer token
}

export async function sendMessageToAgent(content: string, threadId?: string) {
  const token = await getIAMExtendedToken();
  const agentId = process.env.WATSONX_AGENT_ID;
  
  const res = await fetch(`${process.env.WATSONX_INSTANCE_URL}/v1/orchestrate/runs?stream=false`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      message: { role: "user", content },
      thread_id: threadId, // Keep blank for new chats
    }),
  });
  return res.json();
}