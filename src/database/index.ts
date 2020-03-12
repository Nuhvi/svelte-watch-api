import fs = require('fs');
import path = require('path');

const statsPath = path.join(path.resolve('.'), 'static/data.json');

const getStats = (): Stats => JSON.parse(fs.readFileSync(statsPath, 'UTF-8'));

const setStats = (newStats: Stats): Stats => {
  try {
    const stats = getStats();
    const newData = { ...stats, ...newStats };
    fs.writeFileSync(statsPath, JSON.stringify(newData));
    return newData;
  } catch (error) {
    return error;
  }
};

export = {
  getStats,
  setStats,
};
