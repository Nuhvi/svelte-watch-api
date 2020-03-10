const db = require('../data');
const manulaData = require('../data/manualData.json');

const date = (str) => (str ? new Date(str) : new Date());

const updateStats = () => {
  const { updatedAt, data } = manulaData;
  let res = data;

  if (date(updatedAt) < date()) {
    res = db.updateStats();
  }

  return res;
};

module.exports = {
  updateStats,
  getStats: db.getStats,
};
