interface Stats {
  updatedAt: string;
  data: Library[];
}

type GithubData = GithubDataInterface | {};
interface GithubDataInterface {
  description?: string;
  starsCount?: number;
  hasRecentRelease?: boolean;
  contributorsCount?: number;
  hasMultipleContributers?: boolean;
  hasManyContributers?: boolean;
  recentCommitsCount?: number;
  hasRecentCommits?: boolean;
}

interface NPMData {
  recentDownloadsCount: number;
}
interface Library {
  name: string;
  url: string;
  tags: string[];
  description: string;
  starsCount: number;
  contributorsCount: number;
  recentCommitsCount: number;
  recentDownloadsCount: number;
  hasMeaningfulTests: false;
  hasExampleCode: false;
  hasAPIDoc: false;
  hasCISetup: false;
  hasTopRecentDownloads: boolean;
  hasTopStars: boolean;
  hasRecentRelease: boolean;
  hasMultipleContributers: boolean;
  hasManyContributers: boolean;
  hasRecentCommits: boolean;
  score: number;
}
