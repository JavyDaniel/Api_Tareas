import {Router} from "express";
import {actualizarTarea, crearTarea, eliminarTarea, verTarea, verTareas} from "../controllers/TareasController.js";

const router = Router();

router
    .post('/crearTarea/:usuario_id', crearTarea)
    .get('/verTareas/:usuario_id', verTareas)
    .get('/verTarea/:usuario_id/:tarea_id', verTarea)
    .put('/actualizarTarea/:id', actualizarTarea)
    .delete('/eliminarTarea/:id', eliminarTarea);

export default router;