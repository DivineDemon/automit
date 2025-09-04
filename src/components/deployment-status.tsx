import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getVercelDeployments } from "@/api/apis";
import { cn } from "@/lib/utils";

const DeploymentStatus = () => {
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [deploymentState, setDeploymentState] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setPolling(false);
    setDeploymentState(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setPolling(true);
    }, 10000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let pollTimeout: NodeJS.Timeout;

    const poll = async () => {
      try {
        const data = await getVercelDeployments();

        if (Array.isArray(data) && data.length > 0) {
          setDeploymentState(data[0].state);
          if (data[0].state === "READY") {
            setPolling(false);
            return;
          }
        }
      } catch (e) {
        toast.error(`Error fetching deployment status. ${(e as Error).message}`);
      }

      pollTimeout = setTimeout(poll, 5000);
    };

    if (polling) {
      poll();
    }

    return () => {
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
    };
  }, [polling]);

  return (
    <div
      className={cn(
        "flex w-full max-w-[85%] flex-col items-center justify-center gap-3 rounded-lg border p-5 shadow md:max-w-md",
        {
          "bg-green-500/20 text-green-500": deploymentState === "READY",
          "bg-yellow-500/20 text-yellow-500": deploymentState === "BUILDING",
          "bg-red-500/20 text-red-500":
            deploymentState && deploymentState !== "READY" && deploymentState !== "BUILDING",
        },
      )}
    >
      {loading ? <Loader2 className="size-10 animate-spin text-black" /> : deploymentState}
    </div>
  );
};

export default DeploymentStatus;
