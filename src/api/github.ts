import fetch = require('node-fetch');
import helpers = require('./helpers');
const { parseUrl } = helpers;

const BASE_ENDPOINT = 'https://api.github.com/';
const GH_CLIENT_AUTH = () =>
  `?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}`;

// Helpers

const fullName = (url) => url.split('github.com/')[1];

const reposPath = (url) => BASE_ENDPOINT + 'repos/' + fullName(url);

const isRecentThan = (date, days) =>
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
    // eslint-disable-next-line no-console
    console.log(`Error: ${error}, Target: ${target}`);
    return {
      stars: 0,
      description: '',
    };
  }
};

export = {
  getRepoData,
};
