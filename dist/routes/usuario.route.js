"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../Controller/usuario.controller");
const router = express_1.default.Router();
router.post('/registrar', usuario_controller_1.registrarusuario);
router.get('/carreras', usuario_controller_1.obtenerCarreras);
router.get('/centros', usuario_controller_1.obtenerCentrosRegionales);
router.delete('/eliminar/:idPersona', usuario_controller_1.eliminarPersona);
exports.default = router;
