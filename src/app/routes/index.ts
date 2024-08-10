import express from "express";
import { VisaRoutes } from "../module/visa/visa.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/visa",
    route: VisaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
