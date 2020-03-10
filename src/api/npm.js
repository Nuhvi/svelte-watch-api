const fetch = require('node-fetch');

const BASE_ENDPOINT = 'https://api.npmjs.org/';

// Helpers

const pakageName = (url) => url.split('github.com/')[1].split('/')[1];

const safe = (fn) =>
  fn.catch((error, target) => {
    console.debug(`NPM fetch: ${error}, target was: ${target}`);
    return {};
  });

const getRecentDownloadsData = async (url) => {
  const target = `${BASE_ENDPOINT}downloads/point/last-month/${pakageName(
    url,
  )}`;

  const res = await fetch(target);
  const json = await res.json();

  return {
    recentDownloadsCount: json.downloads,
  };
};

module.exports = (url) => safe(getRecentDownloadsData(url));
