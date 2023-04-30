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

        if(!usuario.length){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

         const [tarea] = await conn.query(insertTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, usuario[0].id]);
         res.status(201).json({id: tarea.insertId, titulo, estatus});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}


export const verTareas = async (req, res) => {
    try {
        const [rows] = await conn.query(selectTareas);
        res.status(200).json(rows);

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }
}


export const verTarea = async (req, res)=> {
    try {
        const { id } = req.params;
        const [rows] = await conn.query(selectTarea, [id]);

        if(!rows.length){
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json(rows[0]);

    }catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}
export const actualizarTarea = async (req, res)=> {
    try {
        const { id } = req.params;
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body;

        const [result] = await conn.query(updateTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags, id]);

        if(!result.affectedRows){
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        const [rows] = await conn.query(selectTarea, [id]);
        res.status(200).json(rows[0 ]);

    }catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}
export const eliminarTarea = async (req, res)=> {
    try {
        const { id } = req.params;
        const [rows] = await conn.query(deleteTarea, [id]);

        if(!rows.affectedRows){
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.sendStatus(204);

    }catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}