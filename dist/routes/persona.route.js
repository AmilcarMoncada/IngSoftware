"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persona_controller_1 = require("../Controller/persona.controller");
const router = express_1.default.Router();
router.post('/registrar', persona_controller_1.registrarPersona);
router.get('/obtener', persona_controller_1.obtenerPersonas);
router.get('/carreras', persona_controller_1.obtenerCarreras);
router.get('/centros', persona_controller_1.obtenerCentrosRegionales);
router.get('/motivos', persona_controller_1.obtenerMotivosVisita);
exports.default = router;
