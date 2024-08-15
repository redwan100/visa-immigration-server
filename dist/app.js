"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const globalErrorHandler_1 = __importDefault(
  require("./src/app/middleware/globalErrorHandler")
);
const notFound_1 = __importDefault(require("./src/app/middleware/notFound"));
const visa_model_1 = __importDefault(
  require("./src/app/module/visa/visa.model")
);
const routes_1 = __importDefault(require("./src/app/routes"));
const app = (0, express_1.default)();
//! parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(body_parser_1.default.json()); // For parsing application/
app.use(
  (0, cors_1.default)({
    // origin: "http://localhost:5173",
    origin: "*",
    credentials: true,
  })
);
app.use((0, morgan_1.default)("dev"));
// download pdf functionality
app.get("/download/:visaNumber", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const visaNumber = req.params.visaNumber;
    // Fetch the document based on visaNumber from MongoDB
    const visaDocument = yield visa_model_1.default.findOne({ visaNumber });
    if (!visaDocument) {
      return res.status(404).send("File not found");
    }
    const filePath = visaDocument.path;
    // Set headers and send the file
    res.download(filePath, path_1.default.basename(filePath), (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("File download failed");
      }
    });
  })
);
app.get("/", (req, res, next) => {
  try {
    res.send("Hello sunrise agency");
  } catch (error) {
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
