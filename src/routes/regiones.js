import { Router } from "express";
const router = Router();

import {
  getRegion,
  getRegiones,
  createRegion,
  updateRegion,
  deleteRegion,
  count,
} from "../controllers/regiones.controller.js";


router.get("/regiones", getRegiones);

router.get("/regiones/count", count);

router.get("/regiones/:id", getRegion);

router.post("/regiones", createRegion);

router.put("/regiones/:id", updateRegion);

router.delete("/regiones/:id", deleteRegion);



export default router;
