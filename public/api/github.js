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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fetch = require("node-fetch");
var BASE_ENDPOINT = 'https://api.github.com/';
var GH_CLIENT_AUTH = function () {
    return "?client_id=" + process.env.GH_CLIENT_ID + "&client_secret=" + process.env.GH_CLIENT_SECRET;
};
// Helpers
var fullName = function (url) { return url.split('github.com/')[1]; };
var reposPath = function (url) {
    return BASE_ENDPOINT + 'repos/' + fullName(url);
};
var isRecentThan = function (date, days) {
    return new Date(date).getTime() > new Date().getTime() - days * 86400000;
};
var sanitizeVersion = function (v) {
    if (!v)
        return;
    var foundVersion = v.match(/\d\.\d\.\d/);
    if (foundVersion)
        return 'v' + foundVersion;
};
var getRepoData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var target, res, json, watchers, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = reposPath(url) + GH_CLIENT_AUTH();
                return [4 /*yield*/, fetch(target)];
            case 1:
                res = _a.sent();
                if (res.status === 404)
                    return [2 /*return*/, {}];
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                watchers = json.watchers, description = json.description;
                return [2 /*return*/, {
                        starsCount: watchers,
                        description: description
                    }];
        }
    });
}); };
var getRecentReleaseData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var target, res, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = reposPath(url) + '/releases/latest' + GH_CLIENT_AUTH();
                return [4 /*yield*/, fetch(target)];
            case 1:
                res = _a.sent();
                if (res.status === 404)
                    return [2 /*return*/, {}];
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                return [2 /*return*/, {
                        version: sanitizeVersion(json.tag_name),
                        lastestReleaseDate: json.published_at,
                        hasRecentRelease: isRecentThan(json.published_at, 360)
                    }];
        }
    });
}); };
var decode64 = function (raw) { return Buffer.from(raw, 'base64').toString(); };
var getPackageJSONData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var target, res, json, packageJSONData, description, version, sanitizedVersion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = reposPath(url) + '/contents/package.json' + GH_CLIENT_AUTH();
                return [4 /*yield*/, fetch(target)];
            case 1:
                res = _a.sent();
                if (res.status === 404)
                    return [2 /*return*/, {}];
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                packageJSONData = JSON.parse(decode64(json.content));
                description = packageJSONData.description, version = packageJSONData.version;
                sanitizedVersion = sanitizeVersion(version);
                return [2 /*return*/, __assign({ description: description }, (sanitizedVersion ? { version: sanitizedVersion } : {}))];
        }
    });
}); };
var getContributorsData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var target, res, json, contributorsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = reposPath(url) + '/contributors' + GH_CLIENT_AUTH();
                return [4 /*yield*/, fetch(target)];
            case 1:
                res = _a.sent();
                if (res.status === 404)
                    return [2 /*return*/, {}];
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                contributorsCount = json.length;
                return [2 /*return*/, {
                        contributorsCount: contributorsCount,
                        hasMultipleContributers: contributorsCount > 1,
                        hasManyContributers: contributorsCount > 7
                    }];
        }
    });
}); };
var getCommitsData = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var target, res, json, commits, recentCommitsCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                target = reposPath(url) + '/commits' + GH_CLIENT_AUTH();
                return [4 /*yield*/, fetch(target)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                commits = json;
                recentCommitsCount = commits.filter(function (item) {
                    return isRecentThan(item.commit.author.date, 90);
                }).length;
                return [2 /*return*/, {
                        recentCommitsCount: recentCommitsCount,
                        hasRecentCommits: recentCommitsCount > 5
                    }];
        }
    });
}); };
module.exports = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 6, , 7]);
                _a = [{}];
                return [4 /*yield*/, getRecentReleaseData(url)];
            case 1:
                _b = [__assign.apply(void 0, _a.concat([(_f.sent())]))];
                return [4 /*yield*/, getPackageJSONData(url)];
            case 2:
                _c = [__assign.apply(void 0, _b.concat([(_f.sent())]))];
                return [4 /*yield*/, getRepoData(url)];
            case 3:
                _d = [__assign.apply(void 0, _c.concat([(_f.sent())]))];
                return [4 /*yield*/, getContributorsData(url)];
            case 4:
                _e = [__assign.apply(void 0, _d.concat([(_f.sent())]))];
                return [4 /*yield*/, getCommitsData(url)];
            case 5: return [2 /*return*/, __assign.apply(void 0, _e.concat([(_f.sent())]))];
            case 6:
                error_1 = _f.sent();
                return [2 /*return*/, {}];
            case 7: return [2 /*return*/];
        }
    });
}); };
