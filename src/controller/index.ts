import db = require('../database');
import api = require('../api');
import dateHelpers = require('../utils/date');
const { isRecentThan } = dateHelpers;

const updateStats = async (): Promise<Stats> => {
  const readStats = db.getStats();

  // if (isRecentThan(readStats.updatedAt, 7)) return readStats;

  const readData = await api.fetchAll(readStats.data);

  const stats = db.setStats({
    updatedAt: `${new Date()}`,
    data: readData,
  });

  return stats;
};

export = {
  updateStats,
  getStats: db.getStats,
};
