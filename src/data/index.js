const fs = require('fs');
const path = require('path');
const stats = require('./stats');

const joinPath = (str) => path.join(__dirname, str);

const update = () => {
  const filePath = joinPath('stats.json');
  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath));
    const newData = { ...jsonData, updatedAt: new Date() };
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return newData;
  } catch (error) {
    return error;
  }
};

module.exports = {
  ...stats,
  update,
};
