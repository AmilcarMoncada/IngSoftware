import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import persona from './routes/persona.route'
import imagen from './routes/image.route'
import login from './routes/login.route'

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/persona', persona);
app.use('/image', imagen);
app.use('/auth', login);

//Aqui esta el servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor funcionando ');
});

//Mensaje de consola para saber que el servidor funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});