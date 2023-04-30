import {Router} from "express";
import {actualizarTarea, crearTarea, eliminarTarea, verTarea, verTareas} from "../controllers/TareasController.js";

const router = Router();

router
    .post('/crearTarea/:usuario_id', crearTarea)
    .get('/verTareas/:usuario_id', verTareas)
    .get('/verTarea/:usuario_id/:tarea_id', verTarea)
    .put('/actualizarTarea/:usuario_id/:tarea_id', actualizarTarea)
    .delete('/eliminarTarea/:usuario_id/:tarea_id', eliminarTarea);

export default router;