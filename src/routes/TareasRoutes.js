import {Router} from "express";
import {actualizarTarea, crearTarea, eliminarTarea, verTarea, verTareas} from "../controllers/TareasController.js";

const router = Router();

router
    .post('/crearTarea', crearTarea)
    .get('/verTareas', verTareas)
    .get('/verTarea/:id', verTarea)
    .put('/actualizarTarea/:id', actualizarTarea)
    .delete('/eliminarTarea/:id', eliminarTarea);

export default router;