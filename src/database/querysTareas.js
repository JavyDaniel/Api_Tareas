export const  insertTarea = 'INSERT INTO tareas (titulo, descripcion, estatus, fecha, comentarios, responsable, tags) VALUES(?,?,?,?,?,?,?)';

export const selectTareas = 'SELECT * FROM tareas';

export const selectTarea = 'SELECT * FROM tareas WHERE id = ?';