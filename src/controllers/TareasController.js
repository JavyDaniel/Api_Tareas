import {conn} from "../database/database.js";
import {insertTarea} from "../database/querysTareas.js";

export const crearTarea = async (req, res) => {
    try {
        const {titulo, descripcion, estatus, fecha, comentarios, responsable, tags} = req.body
        const [rows] = await conn.query(insertTarea, [titulo, descripcion, estatus, fecha, comentarios, responsable, tags]);
        res.status(201).json({id: rows.insertId, titulo, estatus});

    } catch (error) {
        return res.status(500).json({massage: "Error"});
    }

}