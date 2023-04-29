import {Router} from "express";
import {crearTarea} from "../controllers/TareasController.js";

const router = Router();

router.post('/crearTarea', crearTarea);

export default router;