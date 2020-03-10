const fs = require('fs');
const path = require('path');
const stats = require('./stats');

const statsPath = path.join(__dirname, 'stats.json');

const getStats = () => JSON.parse(fs.readFileSync(statsPath));

const updateStats = () => {
  try {
    const jsonData = getStats();
    const newData = { ...jsonData, updatedAt: new Date() };
    fs.writeFileSync(statsPath, JSON.stringify(newData));
    return newData;
  } catch (error) {
    return error;
  }
};

module.exports = {
  ...stats,
  getStats,
  updateStats,
};
