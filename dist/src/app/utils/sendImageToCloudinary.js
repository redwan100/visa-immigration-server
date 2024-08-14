"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// cloudinary.config({
//   cloud_name: config.cloud_name,
//   api_key: config.api_key,
//   api_secret: config.api_secret,
// });
// const sendImageToCloudinary = (path: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: `${Date.now()}` },
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result);
//         // Delete local image file
//         fs.unlink(path, function (error) {
//           if (error) {
//             console.error("Error deleting local image file:", error);
//           } else {
//             console.log("Local image file deleted successfully.");
//           }
//         });
//       }
//     );
//   });
// };
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
        const extName = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(extName, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-") +
            "-" +
            Date.now();
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, fileName + extName);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
// export default sendImageToCloudinary;
