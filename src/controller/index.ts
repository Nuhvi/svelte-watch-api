import db = require('../database');
import api = require('../api');
import dateHelpers = require('../utils/date');
import calculateScore = require('../utils/controllerHelper');
const { isRecentThanDaysAgo } = dateHelpers;

const updateStats = async (): Promise<Stats> => {
  const readStats = db.getStats();

  if (
    readStats &&
    readStats.updatedAt &&
    isRecentThanDaysAgo(readStats.updatedAt, 1)
  )
    return readStats;

  const readData = await api.fetchAll(readStats.data);
  const data = calculateScore(readData).sort((a, b) => b.score - a.score);

  const stats = db.setStats({
    updatedAt: `${new Date()}`,
    data,
  });

  return stats;
};

export = {
  updateStats,
  getStats: db.getStats,
};
