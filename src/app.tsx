import { GitBranch } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { postToWorkflow } from "./api/apis";
import DeploymentStatus from "./components/deployment-status";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const [repo, setRepo] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [deploymentKey, setDeploymentKey] = useState(0);
  const [showDeploymentStatus, setShowDeploymentStatus] = useState(false);

  const handleSubmit = async () => {
    const response = await postToWorkflow(username, repo, content);

    if (response.ok) {
      toast.success("Deployment Initialized!");

      setRepo("");
      setContent("");
      setUsername("");

      setShowDeploymentStatus(false);

      setTimeout(() => {
        setDeploymentKey((k) => k + 1);
        setShowDeploymentStatus(true);
      }, 0);
    } else {
      toast.error("Failed to initialize deployment!");
    }
  };

  return (
    <>
      <Toaster richColors={true} duration={1500} />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden">
        <div className="flex w-full max-w-[85%] items-center justify-center gap-2.5 md:max-w-md">
          <GitBranch className="size-6 text-black" />
          <span className="text-center font-bold text-3xl">Automit</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-full max-w-[85%] flex-col items-center justify-center gap-5 md:max-w-md"
        >
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="username" className="w-full text-left">
              Github Username
            </Label>
            <Input
              type="text"
              placeholder="Enter Github Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="repo" className="w-full text-left">
              Repo Name
            </Label>
            <Input type="text" placeholder="Enter Repo Name" value={repo} onChange={(e) => setRepo(e.target.value)} />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Label htmlFor="content" className="w-full text-left">
              File Content
            </Label>
            <Input
              type="text"
              placeholder="Enter Content for README.md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" variant="default">
            Submit
          </Button>
        </form>
        {showDeploymentStatus && <DeploymentStatus key={deploymentKey} />}
      </div>
    </>
  );
};

export default App;
