import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import persona from './routes/persona.route'
import imagen from './routes/image.route'
import login from './routes/login.route'
import ingresos from './routes/ingresos.route'


dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cors({
    origin:'https://ing-software-ing-software-2025.vercel.app',
    methods:['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/persona', persona);
app.use('/image', imagen);
app.use('/auth', login);
app.use('/ingresos', ingresos);


//Aqui esta el servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Servidor funcionando ');
});

//Mensaje de consola para saber que el servidor funciona.
app.listen(3000 , '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});