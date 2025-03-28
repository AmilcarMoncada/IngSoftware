"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const image_route_1 = __importDefault(require("./routes/image.route"));
dotenv_1.default.config();
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//rutas
app.use('/usuario', usuario_route_1.default);
app.use('/image', image_route_1.default);
//Aqui esta el servidor Raiz.
app.get('/', (req, res) => {
    res.send('Servidor funcionando ');
});
//Mensaje de consola para saber que el servidor funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});
