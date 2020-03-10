const fs = require('fs');
const path = require('path');

const manualDataPath = path.join(__dirname, 'manualData.json');
const statsPath = path.join(__dirname, 'stats.json');

const getManualData = () => JSON.parse(fs.readFileSync(manualDataPath));
const getStats = () => JSON.parse(fs.readFileSync(statsPath));

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

module.exports = {
  getManualData,
  getStats,
  setStats,
};
