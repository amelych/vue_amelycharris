import express from 'express';
const rutas = express.Router();

rutas.get('/', (req, res) => {
    res.send('Ruta de las tareas');
});

export default rutas;