"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var config_1 = require("../config");
var ask_1 = require("../utils/ask");
var login_1 = require("../login");
var apply_1 = require("../apply");
var fetchJobLinksUser_1 = require("../fetch/fetchJobLinksUser");
var wait = function (time) { return new Promise(function (resolve) { return setTimeout(resolve, time); }); };
var state = {
    paused: false
};
var askForPauseInput = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ask_1["default"]("press enter to pause the program")];
            case 1:
                _a.sent();
                state.paused = true;
                return [4 /*yield*/, ask_1["default"]("finishing job application...\n")];
            case 2:
                _a.sent();
                state.paused = false;
                console.log("unpaused");
                askForPauseInput();
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, listingPage, pages, linkGenerator, applicationPage, linkGenerator_1, linkGenerator_1_1, _a, link, title, companyName, formData, _b, shouldLog, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, puppeteer_1["default"].launch({
                    headless: false,
                    ignoreHTTPSErrors: true,
                    args: ["--disable-setuid-sandbox", "--no-sandbox",]
                })];
            case 1:
                browser = _d.sent();
                return [4 /*yield*/, browser.createIncognitoBrowserContext()];
            case 2:
                context = _d.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                listingPage = _d.sent();
                return [4 /*yield*/, browser.pages()];
            case 4:
                pages = _d.sent();
                return [4 /*yield*/, pages[0].close()];
            case 5:
                _d.sent();
                return [4 /*yield*/, login_1["default"]({
                        page: listingPage,
                        email: config_1["default"].LINKEDIN_EMAIL,
                        password: config_1["default"].LINKEDIN_PASSWORD
                    })];
            case 6:
                _d.sent();
                askForPauseInput();
                linkGenerator = fetchJobLinksUser_1["default"]({
                    page: listingPage,
                    location: config_1["default"].LOCATION,
                    keywords: config_1["default"].KEYWORDS,
                    workplace: {
                        remote: config_1["default"].WORKPLACE.REMOTE,
                        onSite: config_1["default"].WORKPLACE.ON_SITE,
                        hybrid: config_1["default"].WORKPLACE.HYBRID
                    },
                    jobTitle: config_1["default"].JOB_TITLE,
                    jobDescription: config_1["default"].JOB_DESCRIPTION,
                    jobDescriptionLanguages: config_1["default"].JOB_DESCRIPTION_LANGUAGES
                });
                applicationPage = null;
                _d.label = 7;
            case 7:
                _d.trys.push([7, 23, 24, 29]);
                linkGenerator_1 = __asyncValues(linkGenerator);
                _d.label = 8;
            case 8: return [4 /*yield*/, linkGenerator_1.next()];
            case 9:
                if (!(linkGenerator_1_1 = _d.sent(), !linkGenerator_1_1.done)) return [3 /*break*/, 22];
                _a = linkGenerator_1_1.value, link = _a[0], title = _a[1], companyName = _a[2];
                if (!(!applicationPage || process.env.SINGLE_PAGE !== "true")) return [3 /*break*/, 11];
                return [4 /*yield*/, context.newPage()];
            case 10:
                applicationPage = _d.sent();
                _d.label = 11;
            case 11: return [4 /*yield*/, applicationPage.bringToFront()];
            case 12:
                _d.sent();
                _d.label = 13;
            case 13:
                _d.trys.push([13, 15, , 16]);
                formData = {
                    phone: config_1["default"].PHONE,
                    cvPath: config_1["default"].CV_PATH,
                    homeCity: config_1["default"].HOME_CITY,
                    coverLetterPath: config_1["default"].COVER_LETTER_PATH,
                    yearsOfExperience: config_1["default"].YEARS_OF_EXPERIENCE,
                    languageProficiency: config_1["default"].LANGUAGE_PROFICIENCY,
                    requiresVisaSponsorship: config_1["default"].REQUIRES_VISA_SPONSORSHIP,
                    booleans: config_1["default"].BOOLEANS,
                    textFields: config_1["default"].TEXT_FIELDS,
                    multipleChoiceFields: config_1["default"].MULTIPLE_CHOICE_FIELDS
                };
                return [4 /*yield*/, apply_1["default"]({
                        page: applicationPage,
                        link: link,
                        formData: formData,
                        shouldSubmit: process.argv[2] === "SUBMIT"
                    })];
            case 14:
                _d.sent();
                console.log("Applied to " + title + " at " + companyName);
                return [3 /*break*/, 16];
            case 15:
                _b = _d.sent();
                console.log("Error applying to " + title + " at " + companyName);
                return [3 /*break*/, 16];
            case 16: return [4 /*yield*/, listingPage.bringToFront()];
            case 17:
                _d.sent();
                shouldLog = true;
                _d.label = 18;
            case 18:
                if (!state.paused) return [3 /*break*/, 21];
                shouldLog && console.log("\nProgram paused, press enter to continue the program");
                return [4 /*yield*/, wait(2000)];
            case 19:
                _d.sent();
                _d.label = 20;
            case 20:
                shouldLog = false;
                return [3 /*break*/, 18];
            case 21: return [3 /*break*/, 8];
            case 22: return [3 /*break*/, 29];
            case 23:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 29];
            case 24:
                _d.trys.push([24, , 27, 28]);
                if (!(linkGenerator_1_1 && !linkGenerator_1_1.done && (_c = linkGenerator_1["return"]))) return [3 /*break*/, 26];
                return [4 /*yield*/, _c.call(linkGenerator_1)];
            case 25:
                _d.sent();
                _d.label = 26;
            case 26: return [3 /*break*/, 28];
            case 27:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 28: return [7 /*endfinally*/];
            case 29: return [2 /*return*/];
        }
    });
}); })();
