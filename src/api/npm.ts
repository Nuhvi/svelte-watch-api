import fetch = require('node-fetch');
import helpers = require('./helpers');
const { parseUrl } = helpers;

const BASE_ENDPOINT = 'https://api.npmjs.org/';

const getRecentDownloadsData = async (url: string): Promise<NPMData | {}> => {
  try {
    const target =
      BASE_ENDPOINT + 'downloads/point/last-month/' + parseUrl(url).repo;

    const res = await fetch(target);
    if (res.status === 400) return {};
    const json = await res.json();
    const downloads = json.downloads;

    return {
      recentDownloadsCount: downloads,
    };
  } catch (error) {
    return {};
  }
};

export = getRecentDownloadsData;
