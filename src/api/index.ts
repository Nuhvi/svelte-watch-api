import getRecentDownloadsData = require('./npm');
import github = require('./github');

const fetchLibraryStats = async (library): Promise<{}> => {
  const url = library.url;
  const recentDownloadsData = await getRecentDownloadsData(url);
  const repoData = await github.getRepoData(url);
  return {
    ...library,
    ...recentDownloadsData,
    ...repoData,
  };
};

const fetchAll = async (libraries = []) => {
  const promises = [];
  libraries.forEach((library) => {
    promises.push(fetchLibraryStats(library));
  });

  const res = await Promise.all(promises);
  return res;
};

export = {
  fetchAll,
};
