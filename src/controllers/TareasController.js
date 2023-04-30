import {conn} from "../database/database.js";
import {
    deleteTarea,
    insertTarea,
    selectTarea,
    selectTareas,
    selectUsuario,
    updateTarea
} from "../database/querysTareas.js";

export const crearTarea = async (req, res) => {
    try {
        const {usuario_id} = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body

        const [usuario] = await conn.query(selectUsuario, [usuario_id]);

        if (!usuario.length) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const [tarea] = await conn.query(insertTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, usuario[0].id]);
        res.status(201).json({id: tarea.insertId, titulo, estatus});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}


export const verTareas = async (req, res) => {
    try {
        const {usuario_id} = req.params;

        const [usuario] = await conn.query(selectUsuario, [usuario_id]);

        if (!usuario.length) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const [rows] = await conn.query(selectTareas, [usuario_id]);

        const tareas = rows.map(tarea => ({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            estatus: tarea.estatus,
            fecha: new Date(tarea.fecha).toLocaleDateString('es-MX', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replace(/\//g, '-')

        }));

        res.status(200).json({Usuario: usuario[0].username, Tareas: tareas});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }
}


export const verTarea = async (req, res) => {
    try {
        const {usuario_id, tarea_id} = req.params;

        const [usuario] = await conn.query(selectUsuario, [usuario_id]);

        if (!usuario.length) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const [tarea] = await conn.query(selectTarea, [tarea_id]);

        if (!tarea.length) {
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        if (usuario[0].id !== tarea[0].usuario_id) {
            return res.status(400).json({message: "La tarea no pertenece al usuario " + usuario[0].username});
        }

        const tareaCompleta = tarea.map(t => ({
            ...t,
            fecha: new Date(t.fecha).toLocaleDateString('es-MX', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replace(/\//g, '-'),
            comentarios: t.comentarios === null ? "" : t.comentarios,
            responsable: t.responsable == null ? "": t.responsable,
            tags: t.tags == null ? "" : t.tags
        }));

        delete tareaCompleta[0].usuario_id;
        res.status(200).json({Usuario: usuario[0].username, Tarea: tareaCompleta[0]});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}
export const actualizarTarea = async (req, res) => {
    try {
        const {id} = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body;

        const [result] = await conn.query(updateTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, id]);

        if (!result.affectedRows) {
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        const [rows] = await conn.query(selectTarea, [id]);
        res.status(200).json(rows[0]);

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}
export const eliminarTarea = async (req, res) => {
    try {
        const {id} = req.params;
        const [rows] = await conn.query(deleteTarea, [id]);

        if (!rows.affectedRows) {
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}