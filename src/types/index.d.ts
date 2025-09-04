declare type Deployment = {
  uid: string;
  name: string;
  projectId: string;
  url: string;
  created: number;
  source: string;
  state: string;
  readyState: string;
  readySubstate: string;
  type: string;
  creator: {
    uid: string;
    email: string;
    username: string;
    githubLogin: string;
  };
  inspectorUrl: string;
  meta: {
    githubCommitAuthorName: string;
    githubCommitAuthorEmail: string;
    githubCommitMessage: string;
    githubCommitOrg: string;
    githubCommitRef: string;
    githubCommitRepo: string;
    githubCommitSha: string;
    githubDeployment: string;
    githubOrg: string;
    githubRepo: string;
    githubRepoOwnerType: string;
    githubCommitRepoId: string;
    githubRepoId: string;
    githubRepoVisibility: string;
    githubHost: string;
    githubCommitAuthorLogin: string;
    branchAlias: string;
  };
  target: string;
  aliasError: string | null;
  aliasAssigned: number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
  projectSettings: {
    commandForIgnoringBuildStep: string | null;
  };
};

declare type Pagination = {
  count: number;
  next: number;
  prev: number;
}

declare type VercelDeploymentsResponse = {
  deployments: Deployment[];
  pagination: Pagination;
}