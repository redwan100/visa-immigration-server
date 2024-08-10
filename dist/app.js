"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//! parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(body_parser_1.default.json()); // For parsing application/
app.use((0, cors_1.default)({
    // origin: "http://localhost:5173",
    origin: "*",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res, next) => {
    try {
        res.send("Hello sunrise agency");
    }
    catch (error) {
        next(error);
    }
});
// ! router
app.use("/api/v1/", routes_1.default);
// * not found route handler
app.all("*", notFound_1.default);
// ! global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
