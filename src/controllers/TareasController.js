import {conn} from "../database/database.js";
import {
    deleteTarea,
    insertTarea,
    selectTarea,
    selectTareas,
    selectUsuario,
    updateTarea
} from "../database/querysTareas.js";
import {buscarTarea, buscarTareas, buscarUsuario, crearUnaTarea} from "../services/TareasService.js";

export const crearTarea = async (req, res) => {
    try {
        const {usuario_id} = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body

        const {usuario, errorUsuario} = await buscarUsuario(usuario_id);

        if (errorUsuario) {
            return res.status(404).json({message: errorUsuario});
        }

        const tarea = await crearUnaTarea(titulo, descripcion, estatus, fecha, comentarios, responsable, tags, usuario.id)
        res.status(201).json({id: tarea.insertId, titulo, estatus});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}


export const verTareas = async (req, res) => {
    try {
        const {usuario_id} = req.params;

        const {usuario, errorUsuario} = await buscarUsuario(usuario_id);

        if (errorUsuario) {
            return res.status(404).json({message: errorUsuario});
        }

        const rows = await buscarTareas(usuario_id);

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

        res.status(200).json({Usuario: usuario.username, Tareas: tareas});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }
}


export const verTarea = async (req, res) => {
    try {
        const {usuario_id, tarea_id} = req.params;

        const {usuario, errorUsuario} = await buscarUsuario(usuario_id);

        if (errorUsuario) {
            return res.status(404).json({message: errorUsuario});
        }

        const {tarea, errorTarea} = await buscarTarea(tarea_id);

        if (errorTarea) {
            return res.status(404).json({message: errorTarea});
        }

        if (usuario.id !== tarea.usuario_id) {
            return res.status(400).json({message: "La tarea no pertenece al usuario " + usuario.username});
        }

        const tareaCompleta ={
            ...tarea,
            fecha: new Date(tarea.fecha).toLocaleDateString('es-MX', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replace(/\//g, '-'),
            comentarios: tarea.comentarios === null ? "" : t.comentarios,
            responsable: tarea.responsable == null ? "": t.responsable,
            tags: tarea.tags == null ? "" : tarea.tags
        };

        delete tareaCompleta.usuario_id;
        res.status(200).json({Usuario: usuario.username, Tarea: tareaCompleta});

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