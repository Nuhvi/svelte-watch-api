"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require("fs");
var path = require("path");
var manualDataPath = path.join(__dirname, 'manualData.json');
var statsPath = path.join(__dirname, 'stats.json');
var getManualData = function () {
    return JSON.parse(fs.readFileSync(manualDataPath, 'utf-8'));
};
var getStats = function () { return JSON.parse(fs.readFileSync(statsPath, 'utf-8')); };
var setStats = function (newStats) {
    if (newStats === void 0) { newStats = {}; }
    try {
        var stats = getStats();
        var newData = __assign(__assign({}, stats), newStats);
        fs.writeFileSync(statsPath, JSON.stringify(newData));
        return newData;
    }
    catch (error) {
        return error;
    }
};
module.exports = {
    getManualData: getManualData,
    getStats: getStats,
    setStats: setStats
};
