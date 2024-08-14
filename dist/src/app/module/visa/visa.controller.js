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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisaController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const visa_service_1 = require("./visa.service");
const createVisa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield visa_service_1.VisaServices.createVisaIntoDB(req);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            message: "Visa created successfully",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteVisa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield visa_service_1.VisaServices.deleteVisaFromDB(id);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Visa deleted successfully",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const getVisaFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield visa_service_1.VisaServices.getVisaFiltering(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Visa retrieved successfully",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
const getVisa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield visa_service_1.VisaServices.getAllVisaFromDB();
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "All Visa retrieved successfully",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.VisaController = {
    createVisa,
    deleteVisa,
    getVisaFilter,
    getVisa,
};
