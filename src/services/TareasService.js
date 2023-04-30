import {conn} from "../database/database.js";
import {
    deleteTarea,
    insertTarea,
    selectTarea,
    selectTareas,
    selectUsuario,
    updateTarea
} from "../database/querysTareas.js";

export const buscarUsuario = async (usuario_id) => {

    const [usuario] = await conn.query(selectUsuario, [usuario_id]);

    if (!usuario.length) {
        return {errorUsuario: "Usuario no encontrado"}
    }

    return {usuario: usuario[0]};
}

export const buscarTarea = async (tarea_id) => {

    const [tarea] = await conn.query(selectTarea, [tarea_id]);

    if (!tarea.length) {
        return {errorTarea: "Tarea no encontrada"};
    }
    return {tarea: tarea[0]};
}

