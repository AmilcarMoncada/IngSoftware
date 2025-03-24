import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usuario from './routes/usuario.route'
import imagen from './routes/image.route'

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/usuario', usuario);
app.use('/image', imagen);

//Aqui esta el servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor funcionando ');
});

//Mensaje de consola para saber que el servidor funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});