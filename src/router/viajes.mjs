import express from 'express';
const rutas = express.Router();
import viaje from '../models/viajes.mjs';

rutas.use(express.json());

rutas.get('/', async(req, res) => {
    const viajes = await viaje.find();
    res.json(viajes);
});

rutas.post('/', async(req, res) => {
    try {
        const nuevoViaje = new viaje(req.body);
        await nuevoViaje.save();
        console.log(nuevoViaje);
        res.json({
            status: 'Viaje guardado'
        })
    } catch (error) {
        console.error('Error al guardar el viaje:', error);
        res.status(500).json({
            error: 'Error al guardar el viaje'
        });
    }
});

rutas.put('/:id', async(req, res) => {
    try {
        await viaje.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Viaje actualizado'
        })
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
        res.status(500).json({
            error: 'Error al actualizar el viaje'
        });
    }
});

rutas.delete('/:id', async(req, res) => {
    try {
        await viaje.findByIdAndDelete(req.params.id);
        res.json({
            status: 'Viaje eliminado'
        })
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        res.status(500).json({
            error: 'Error al eliminar el viaje'
        });
    }
});

export default rutas;