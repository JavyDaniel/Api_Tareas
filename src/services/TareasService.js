import {conn} from "../database/database.js";
import {
    deleteTarea,
    insertTarea,
    selectTarea,
    selectTareas,
    selectUsuario,
    updateTarea
} from "../database/querysTareas.js";

export const validarUsuarioTarea = async (usuario_id, tarea_id) => {

    const [usuario] = await conn.query(selectUsuario, [usuario_id]);

    if (!usuario.length) {
        return {error: "Usuario no encontrado"}
    }

    const [tarea] = await conn.query(selectTarea, [tarea_id]);

    if (!tarea.length) {
        return {error: "Tarea no encontrada"};
    }

    if (usuario[0].id !== tarea[0].usuario_id) {
        return {error: "La tarea no pertenece al usuario " + usuario[0].username};
    }

    return {usuario: usuario[0], tarea: tarea[0]};
}

export const buscarUsuario = async (usuario_id) => {

    const [usuario] = await conn.query(selectUsuario, [usuario_id]);

    if (!usuario.length) {
        return {error: "Usuario no encontrado"}
    }
    return {usuario: usuario[0]};
}
export const buscarTareas = async (usuario_id) => {

    const [rows] = await conn.query(selectTareas, [usuario_id]);
    return rows;
}

export const crearUnaTarea = async (titulo, descripcion, estatus, fecha, comentarios, responsable, tags, usuario_id) => {

    const [tarea] = await conn.query(insertTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, usuario_id]);
    return tarea;
}
export const actualizarUnaTarea = async (titulo, descripcion, estatus, fecha, comentarios, responsable, tags, tarea_id) => {

    await conn.query(updateTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, tarea_id]);

}

