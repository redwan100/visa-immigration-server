"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const visaSchema = new mongoose_1.Schema({
    visaNumber: {
        type: String,
        required: true,
        unique: true,
    },
    clientNumber: {
        type: String,
        required: true,
    },
    passportNumber: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
});
const Visa = (0, mongoose_1.model)("Visa", visaSchema);
exports.default = Visa;
