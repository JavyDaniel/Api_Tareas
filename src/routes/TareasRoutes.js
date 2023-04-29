import {Router} from "express";
import {crearTarea, verTarea, verTareas} from "../controllers/TareasController.js";

const router = Router();

router
    .post('/crearTarea', crearTarea)
    .get('/verTareas', verTareas)
    .get('/verTarea/:id', verTarea);

export default router;