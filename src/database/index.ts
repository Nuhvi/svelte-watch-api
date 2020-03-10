import fs = require('fs');
import path = require('path');

const manualDataPath = path.join(__dirname, 'manualData.json');
const statsPath = path.join(__dirname, 'stats.json');

const getManualData = () =>
  JSON.parse(fs.readFileSync(manualDataPath, 'utf-8'));
const getStats = () => JSON.parse(fs.readFileSync(statsPath, 'utf-8'));

const setStats = (newStats = {}) => {
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
  getManualData,
  getStats,
  setStats,
};
