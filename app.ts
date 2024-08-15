import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import bodyParser from "body-parser";
import path from "path";
import globalErrorHandler from "./src/app/middleware/globalErrorHandler";
import notFound from "./src/app/middleware/notFound";
import Visa from "./src/app/module/visa/visa.model";
import router from "./src/app/routes";

const app: Application = express();

//! parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "*",
    credentials: true,
  })
);

app.use(morgan("dev"));

// download pdf functionality
app.get("/download/:visaNumber", async (req, res) => {
  const visaNumber = req.params.visaNumber;

  // Fetch the document based on visaNumber from MongoDB
  const visaDocument = await Visa.findOne({ visaNumber });

  if (!visaDocument) {
    return res.status(404).send("File not found");
  }

  const filePath = visaDocument?.path;

  // Set headers and send the file
  res.download(filePath, path.basename(filePath), (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("File download failed");
    }
  });
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Hello immigration");
  } catch (error) {
    next(error);
  }
});
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("test route");
  } catch (error) {
    next(error);
  }
});

// ! router
app.use("/api/v1/", router);

// * not found route handler
app.all("*", notFound);

// ! global error handler
app.use(globalErrorHandler);

export default app;
