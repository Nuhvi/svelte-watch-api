import fetch = require('node-fetch');

const BASE_ENDPOINT = 'https://api.github.com/';
const GH_CLIENT_AUTH = (): string =>
  `?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}`;

// Helpers

const fullName = (url: string): string => url.split('github.com/')[1];

const reposPath = (url: string): string =>
  BASE_ENDPOINT + 'repos/' + fullName(url);

const isRecentThan = (date: string, days: number): boolean =>
  new Date(date).getTime() > new Date().getTime() - days * 86400000;

const sanitizeVersion = (v: string): string => {
  if (!v) return;
  const foundVersion = v.match(/\d\.\d\.\d/);
  if (foundVersion) return 'v' + foundVersion;
};

const getRepoData = async (
  url: string,
): Promise<
  | {
      starsCount: number;
      description: string;
    }
  | {}
> => {
  const target = reposPath(url) + GH_CLIENT_AUTH();

  const res = await fetch(target);
  if (res.status === 404) return {};
  const json = await res.json();
  const { watchers, description } = json;

  return {
    starsCount: watchers,
    description,
  };
};

const getRecentReleaseData = async (
  url: string,
): Promise<
  | {
      version: string;
      lastestReleaseDate: string;
      hasRecentRelease: boolean;
    }
  | {}
> => {
  const target = reposPath(url) + '/releases/latest' + GH_CLIENT_AUTH();

  const res = await fetch(target);
  if (res.status === 404) return {};
  const json = await res.json();

  return {
    version: sanitizeVersion(json.tag_name),
    lastestReleaseDate: json.published_at,
    hasRecentRelease: isRecentThan(json.published_at, 360),
  };
};

const decode64 = (raw: string): string => Buffer.from(raw, 'base64').toString();

const getPackageJSONData = async (
  url: string,
): Promise<{
  description?: string;
  version?: string;
}> => {
  const target = reposPath(url) + '/contents/package.json' + GH_CLIENT_AUTH();

  const res = await fetch(target);
  if (res.status === 404) return {};
  const json = await res.json();
  const packageJSONData = JSON.parse(decode64(json.content));
  const { description, version } = packageJSONData;

  const sanitizedVersion = sanitizeVersion(version);

  return {
    description,
    ...(sanitizedVersion ? { version: sanitizedVersion } : {}),
  };
};

const getContributorsData = async (
  url: string,
): Promise<
  | {
      contributorsCount: number;
      hasMultipleContributers: boolean;
      hasManyContributers: boolean;
    }
  | {}
> => {
  const target = reposPath(url) + '/contributors' + GH_CLIENT_AUTH();

  const res = await fetch(target);
  if (res.status === 404) return {};
  const json = await res.json();
  const contributorsCount = json.length;

  return {
    contributorsCount,
    hasMultipleContributers: contributorsCount > 1,
    hasManyContributers: contributorsCount > 7,
  };
};

const getCommitsData = async (
  url: string,
): Promise<{
  recentCommitsCount: number;
  hasRecentCommits: boolean;
}> => {
  const target = reposPath(url) + '/commits' + GH_CLIENT_AUTH();

  const res = await fetch(target);
  const json = await res.json();
  const commits = json;

  const recentCommitsCount = commits.filter((item) =>
    isRecentThan(item.commit.author.date, 90),
  ).length;

  return {
    recentCommitsCount,
    hasRecentCommits: recentCommitsCount > 5,
  };
};

export = async (url: string): Promise<GithubData> => {
  try {
    return {
      ...(await getRecentReleaseData(url)),
      ...(await getPackageJSONData(url)),
      ...(await getRepoData(url)),
      ...(await getContributorsData(url)),
      ...(await getCommitsData(url)),
    };
  } catch (error) {
    return {};
  }
};
