export const postToWorkflow = async (username: string, repo: string, content: string) => {
  const response = await fetch("https://n8n-hdw9.onrender.com/webhook-test/52174b3c-7cb9-4ead-ae45-f296af5d188e", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      repo,
      content,
    }),
  });

  return response;
};

export const getVercelDeployments = async () => {
  const response = await fetch("https://api.vercel.com/v6/deployments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_VERCEL_TOKEN}`,
    },
  });

  const data: VercelDeploymentsResponse = await response.json();
  return data.deployments;
};
