"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRoutes = void 0;
const scully_1 = require("@scullyio/scully");
const axios_1 = __importDefault(require("axios"));
const token_1 = require("../../src/service/credentials/token");
const validator = async () => [];
exports.pageRoutes = "pageRoutes";
const SANITY_PROJECT_ID = "xndl14mc";
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production`;
async function pageRoutesPlugin(route, config = {}) {
    const { data } = await axios_1.default.get(SANITY_URL, {
        headers: { "Authorization": `Bearer ${token_1.SANITY_TOKEN}` },
        params: { "query": "*[_type == 'page'].route.current" },
    });
    return data.result.map(x => ({ route: x }));
}
(0, scully_1.registerPlugin)("router", exports.pageRoutes, pageRoutesPlugin, validator);
//# sourceMappingURL=plugins.js.map