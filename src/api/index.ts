import getNPMData = require('./npm');
import getGithubData = require('./github');

const fetchLibraryStats = async (library): Promise<{}> => {
  const url = library.url;
  const npmData = await getNPMData(url);
  const githubData = await getGithubData(url);

  return {
    ...library,
    ...npmData,
    ...githubData,
  };
};

const fetchAll = async (
  libraries = [],
): Promise<Record<string, string | number | boolean>[]> => {
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
