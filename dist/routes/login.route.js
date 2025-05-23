"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../Controller/auth.controller");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.iniciarSesion);
router.get('/verificarLogin', auth_controller_1.verificarSesion);
router.post('/logout', auth_controller_1.cerrarSesion);
router.post('/signup', auth_controller_1.registrarUsuario);
router.get('/roles', auth_controller_1.obtenerRoles);
router.get('/centros', auth_controller_1.obtenerCentros);
router.post('/areas', auth_controller_1.obtenerAreas);
router.post('/rol', auth_controller_1.obtenerRolGuardia);
router.post('/guardia', auth_controller_1.obtenerDatosGuardia);
exports.default = router;
