import {conn} from "../database/database.js";
import {
    deleteTarea,

} from "../database/querysTareas.js";
import {
    actualizarUnaTarea,
    buscarTareas, buscarUsuario,
    crearUnaTarea, validarUsuarioTarea
} from "../services/TareasService.js";

export const crearTarea = async (req, res) => {
    try {
        const {usuario_id} = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body

        const {usuario, error} = await buscarUsuario(usuario_id);

        if (error) {
            return res.status(404).json({message: error});
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

        const {usuario, error} = await buscarUsuario(usuario_id);

        if (error) {
            return res.status(404).json({message: error});
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

        const {usuario, tarea, error} = await validarUsuarioTarea(usuario_id, tarea_id);

        if (error) {
            return res.status(404).json({message: error});
        }

        const tareaCompleta = {
            ...tarea,
            fecha: new Date(tarea.fecha).toLocaleDateString('es-MX', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replace(/\//g, '-'),
            comentarios: tarea.comentarios === null ? "" : tarea.comentarios,
            responsable: tarea.responsable == null ? "" : tarea.responsable,
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
        const {usuario_id, tarea_id} = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body;

        const {usuario, tarea, error} = await validarUsuarioTarea(usuario_id, tarea_id);

        if (error) {
            return res.status(404).json({message: error});
        }

        await actualizarUnaTarea(titulo, descripcion, estatus, fecha, comentarios, responsable, tags, tarea.id)

        res.status(200).json("La tarea se actualizo correctamente");

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