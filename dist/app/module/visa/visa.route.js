"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const visa_controller_1 = require("./visa.controller");
const router = express_1.default.Router();
router.post("/", sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, visa_controller_1.VisaController.createVisa);
router.delete("/:id", visa_controller_1.VisaController.deleteVisa);
router.post("/filter", visa_controller_1.VisaController.getVisaFilter);
router.get("/all", visa_controller_1.VisaController.getVisa);
exports.VisaRoutes = router;
