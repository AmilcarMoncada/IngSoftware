import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importación rutas
import pruebaRouter from './routes/prueba.route'

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/prueba', pruebaRouter);

//Aqui esta el servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor funcionando ');
});

//Mensaje de consola para saber que el servidor funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});