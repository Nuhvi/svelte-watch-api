// Helpers
const parseUrl = (url: string): { org: string; repo: string } => {
  const [org, repo] = url.split('github.com/')[1].split('/');
  return { org, repo };
};

export = {
  parseUrl,
};
