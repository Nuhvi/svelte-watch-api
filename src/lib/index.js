const db = require('../data');
const manulaData = require('../data/manualData.json');

const date = (str) => (str ? new Date(str) : new Date());

module.exports = () => {
  const { updatedAt, data } = manulaData;
  let res = data;

  if (date(updatedAt) < date()) {
    res = db.update();
  }

  return res;
};
