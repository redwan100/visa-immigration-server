import express from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { VisaController } from "./visa.controller";
const router = express.Router();

router.post(
  "/",
  upload.single("file"),

  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  VisaController.createVisa
);

router.delete("/:id", VisaController.deleteVisa);
router.post("/filter", VisaController.getVisaFilter);
router.get("/all", VisaController.getVisa);

export const VisaRoutes = router;
