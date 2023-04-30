export const insertTarea = 'INSERT INTO tareas (titulo, descripcion, estatus, fecha, comentarios, responsable, tags) VALUES(?,?,?,?,?,?,?)';

export const selectTareas = 'SELECT * FROM tareas';

export const selectTarea = 'SELECT * FROM tareas WHERE id = ?';

export const deleteTarea = 'DELETE FROM tareas WHERE id = ?';

export const updateTarea = 'UPDATE tareas SET titulo = IFNULL(?, titulo), descripcion = IFNULL(?, descripcion), estatus = IFNULL(?, estatus), fecha = IFNULL(?, fecha), comentarios = IFNULL(?, comentarios), responsable = IFNULL(?, responsable), tags = IFNULL(?, tags) WHERE id = ?';