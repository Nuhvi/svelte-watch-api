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

const getRepoData = async (
  url: string,
): Promise<{
  stars: number;
  description: string;
}> => {
  const target = reposPath(url) + GH_CLIENT_AUTH();

  try {
    const res = await fetch(target);
    const json = await res.json();
    const { watchers, description } = json;

    return {
      stars: watchers,
      description,
    };
  } catch (error) {
    return {
      stars: 0,
      description: '',
    };
  }
};

const getRecentReleaseData = async (
  url: string,
): Promise<{
  version: string;
  lastestReleaseDate: string;
  hasRecentRelease: boolean;
}> => {
  const target = reposPath(url) + '/releases/latest' + GH_CLIENT_AUTH();

  try {
    const res = await fetch(target);
    const json = await res.json();

    return {
      version: json.name,
      lastestReleaseDate: json.published_at,
      hasRecentRelease: isRecentThan(json.published_at, 360),
    };
  } catch (error) {
    return {
      version: '',
      lastestReleaseDate: '',
      hasRecentRelease: false,
    };
  }
};

const getContributorsData = async (
  url: string,
): Promise<{
  contributorsCount: number;
  hasMultipleContributers: boolean;
  hasManyContributers: boolean;
}> => {
  const target = reposPath(url) + '/contributors' + GH_CLIENT_AUTH();

  try {
    const res = await fetch(target);
    const json = await res.json();
    const contributorsCount = json.length;

    return {
      contributorsCount,
      hasMultipleContributers: contributorsCount > 1,
      hasManyContributers: contributorsCount > 7,
    };
  } catch (error) {
    return {
      contributorsCount: 0,
      hasMultipleContributers: false,
      hasManyContributers: false,
    };
  }
};

const getCommitsData = async (
  url: string,
): Promise<{
  recentCommitsCount: number;
  hasRecentCommits: boolean;
}> => {
  const target = reposPath(url) + '/commits' + GH_CLIENT_AUTH();

  try {
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
  } catch (error) {
    return { recentCommitsCount: 0, hasRecentCommits: false };
  }
};

export = async (url: string): Promise<Library> => {
  try {
    return {
      ...(await getRepoData(url)),
      ...(await getRecentReleaseData(url)),
      ...(await getContributorsData(url)),
      ...(await getCommitsData(url)),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.debug(error);
    return {};
  }
};
