import multer from "multer";
import path from "path";

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    const fileName =
      file.originalname
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
export const upload = multer({ storage: storage });

// export default sendImageToCloudinary;
