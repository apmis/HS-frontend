"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTStrategy = exports.AuthenticationService = exports.AuthenticationBaseStrategy = exports.AuthenticationBase = exports.authenticate = exports.hooks = void 0;
const hooks = __importStar(require("./hooks"));
exports.hooks = hooks;
const { authenticate } = hooks;
exports.authenticate = authenticate;
var core_1 = require("./core");
Object.defineProperty(exports, "AuthenticationBase", { enumerable: true, get: function () { return core_1.AuthenticationBase; } });
var strategy_1 = require("./strategy");
Object.defineProperty(exports, "AuthenticationBaseStrategy", { enumerable: true, get: function () { return strategy_1.AuthenticationBaseStrategy; } });
var service_1 = require("./service");
Object.defineProperty(exports, "AuthenticationService", { enumerable: true, get: function () { return service_1.AuthenticationService; } });
var jwt_1 = require("./jwt");
Object.defineProperty(exports, "JWTStrategy", { enumerable: true, get: function () { return jwt_1.JWTStrategy; } });
//# sourceMappingURL=index.js.map