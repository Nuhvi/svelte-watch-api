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
var getPercentileThreshold = function (arr, property, percentile) {
    if (arr === void 0) { arr = [{}]; }
    if (percentile === void 0) { percentile = 10; }
    var sorted = arr.sort(function (a, b) { return a[property] - b[property]; });
    var itemAtPercentile = sorted[Math.ceil((sorted.length * percentile) / 100)];
    return itemAtPercentile[property];
};
var calculateScore = function (libraries) {
    var starsThreshold = getPercentileThreshold(libraries, 'starsCount');
    var downloadsThreshold = getPercentileThreshold(libraries, 'recentDownloadsCount');
    return libraries.map(function (library) {
        var withTopStarsDownloads = __assign(__assign({}, library), { hasTopStars: library.starsCount >= starsThreshold, hasTopRecentDownloads: library.recentDownloadsCount >= downloadsThreshold });
        var score = Object.keys(withTopStarsDownloads).filter(function (key) { return withTopStarsDownloads[key] === true; }).length;
        return __assign(__assign({}, withTopStarsDownloads), { score: score });
    });
};
module.exports = calculateScore;
