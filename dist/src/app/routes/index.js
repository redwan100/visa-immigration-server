"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visa_route_1 = require("../module/visa/visa.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/visa",
        route: visa_route_1.VisaRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
