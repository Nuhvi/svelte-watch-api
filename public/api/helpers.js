"use strict";
// Helpers
var parseUrl = function (url) {
    var _a = url.split('github.com/')[1].split('/'), org = _a[0], repo = _a[1];
    return { org: org, repo: repo };
};
module.exports = {
    parseUrl: parseUrl
};
