import getNPMData = require('./npm');
import getGithubData = require('./github');

const fetchLibraryStats = async (library): Promise<Library> => {
  const url = library.url;
  const npmData = await getNPMData(url);
  const githubData = await getGithubData(url);

  return {
    ...library,
    ...npmData,
    ...githubData,
  };
};

const fetchAll = async (libraries = []): Promise<Library[] | []> => {
  try {
    const promises = [];
    libraries.forEach((library) => {
      promises.push(fetchLibraryStats(library));
    });

    const res = await Promise.all(promises);
    return res;
  } catch (error) {
    return [];
  }
};

export = {
  fetchAll,
};
