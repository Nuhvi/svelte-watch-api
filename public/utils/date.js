"use strict";
var isRecentThanDaysAgo = function (date, days) {
    if (days === void 0) { days = 0; }
    return new Date(date).getTime() > new Date().getTime() - days * 86400000;
};
var date = function (str) {
    return str === 'now' ? new Date() : new Date(str);
};
module.exports = { isRecentThanDaysAgo: isRecentThanDaysAgo, date: date };
