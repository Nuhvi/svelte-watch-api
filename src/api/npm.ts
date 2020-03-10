import fetch = require('node-fetch');

const BASE_ENDPOINT = 'https://api.npmjs.org/';

// Helpers

const pakageName = (url: string): string =>
  url.split('github.com/')[1].split('/')[1];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const safe = (fn: Promise<any>) => fn.catch(() => ({}));

const getRecentDownloadsData = async (
  url,
): Promise<{ recentDownloadsCount: number }> => {
  const target = `${BASE_ENDPOINT}downloads/point/last-month/${pakageName(
    url,
  )}`;

  const res = await fetch(target);
  const json = await res.json();

  return {
    recentDownloadsCount: json.downloads,
  };
};

export = (url: string) => safe(getRecentDownloadsData(url));
