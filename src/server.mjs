// server.mjs
// import express from 'express' y
// http from 'http' son los modulos que se van a usar
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import tareasRouter from './router/tareas.mjs';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use('/tareas', tareasRouter);

app.use(morgan('dev'));
app.use(express.json());

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.send('Hola este es tu nuevo servidor');
});

server.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto..', app.get('port'));
});

mongoose.connect('mongodb://localhost:27017/bbdd')
    .then(db => console.log('Conectado a la base de datos'))
    .catch(error => console.log('Error al conectar a la base de datos', error));