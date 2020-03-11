interface Stats {
  updatedAt: string;
  data: Library[];
}

type GithubData = GithubDataInterface | {};
interface GithubDataInterface {
  description?: string;
  stars?: number;
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
  hasMeaningfulTests: false;
  hasExampleCode: false;
  hasAPIDoc: false;
  hasCISetup: false;
  recentDownloadsCount: number;
  topRecentDownloads: boolean;
  topStarred: boolean;
  stars: number;
  hasRecentRelease: boolean;
  contributorsCount: number;
  hasMultipleContributers: boolean;
  hasManyContributers: boolean;
  recentCommitsCount: number;
  hasRecentCommits: boolean;
}
