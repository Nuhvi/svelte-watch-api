const db = require('../database');
const api = require('../api');

const date = (str) => (str ? new Date(str) : new Date());

const updateStats = async () => {
  const { updatedAt, data } = db.getStats();

  // if (date(updatedAt) < date()) return res;
  const fetchedData = await api.fetchAll(data);
  const res = db.setStats({
    updatedAt: new Date(),
    data: fetchedData,
  });

  return res;
};

module.exports = {
  updateStats,
  getStats: db.getStats,
};
