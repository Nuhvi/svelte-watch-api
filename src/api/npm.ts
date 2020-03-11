import fetch = require('node-fetch');
import helpers = require('./helpers');
const { parseUrl } = helpers;

const BASE_ENDPOINT = 'https://api.npmjs.org/';

const getRecentDownloadsData = async (
  url: string,
): Promise<{
  recentDownloadsCount: number;
  hasRecentDownloads: boolean;
}> => {
  try {
    const target =
      BASE_ENDPOINT + 'downloads/point/last-month/' + parseUrl(url).repo;

    const res = await fetch(target);
    const json = await res.json();
    const downloads = json.downloads;

    return {
      recentDownloadsCount: downloads,
      hasRecentDownloads: downloads > 30,
    };
  } catch (error) {
    return {
      recentDownloadsCount: 0,
      hasRecentDownloads: false,
    };
  }
};

export = getRecentDownloadsData;
