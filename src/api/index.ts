import getRecentDownloadsData = require('./npm');

const fetchLibraryStats = async (library): Promise<{}> => {
  const recentDownloadsData = await getRecentDownloadsData(library.url);
  return {
    ...library,
    ...recentDownloadsData,
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
