import {Router} from "express";
import {crearTarea, verTareas} from "../controllers/TareasController.js";

const router = Router();

router
    .post('/crearTarea', crearTarea)
    .get('/verTareas', verTareas);

export default router;