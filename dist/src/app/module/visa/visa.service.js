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
exports.VisaServices = void 0;
const visa_model_1 = __importDefault(require("./visa.model"));
const createVisaIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req === null || req === void 0 ? void 0 : req.file;
    if (file) {
        req.body.picture = file === null || file === void 0 ? void 0 : file.originalname;
        req.body.path = file.path;
    }
    const res = yield visa_model_1.default.create(req.body);
    return res;
});
const deleteVisaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield visa_model_1.default.findByIdAndDelete(id);
    return res;
});
const getAllVisaFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield visa_model_1.default.find();
    return result;
});
const getVisaFiltering = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { visaNumber, clientNumber, passportNumber, dateOfBirth, nationality } = payload;
    if (!visaNumber || !clientNumber || !passportNumber || !nationality) {
        throw new Error("All fields must be provided");
    }
    const result = yield visa_model_1.default.findOne({
        visaNumber: { $regex: `^${visaNumber}$`, $options: "i" },
        clientNumber: { $regex: `^${clientNumber}$`, $options: "i" },
        passportNumber: { $regex: `^${passportNumber}$`, $options: "i" },
        dateOfBirth,
        nationality: { $regex: `^${nationality}$`, $options: "i" },
    });
    return result;
});
exports.VisaServices = {
    createVisaIntoDB,
    deleteVisaFromDB,
    getAllVisaFromDB,
    getVisaFiltering,
};
