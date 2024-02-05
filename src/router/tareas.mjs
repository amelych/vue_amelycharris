import express from 'express';
const rutas = express.Router();

import tarea from '../models/tarea.mjs';

rutas.get('/', async(req, res) => {
    const tareas = await tarea.find();
    res.json(tareas);
});

// rutas.post('/', async(req, res) => {
//     new tarea();
//     console.log(new tarea());
// })

export default rutas;