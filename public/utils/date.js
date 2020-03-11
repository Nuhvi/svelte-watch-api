"use strict";
var isRecentThan = function (date, days) {
    return new Date(date).getTime() > new Date().getTime() - days * 86400000;
};
var date = function (str) {
    return str === 'now' ? new Date() : new Date(str);
};
module.exports = { isRecentThan: isRecentThan, date: date };
