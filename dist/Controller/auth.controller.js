"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarUsuario = exports.cerrarSesion = exports.verificarSesion = exports.iniciarSesion = void 0;
const auth_model_1 = require("../models/auth.model");
const email_validator_1 = __importDefault(require("email-validator"));
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("Estoy aqui")
    const { correo, password } = req.body;
    if (!correo || !password) {
        res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
        return;
    }
    if (!email_validator_1.default.validate(correo)) {
        res.status(400).json({ message: 'Correo electrónico inválido.' });
        return;
    }
    try {
        const resultado = yield auth_model_1.login.iniciarsesion(correo, password);
        res.status(200).json(resultado);
        return resultado;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.iniciarSesion = iniciarSesion;
const verificarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield auth_model_1.login.verificarsesion();
        res.status(200).json(resultado);
    }
    catch (error) {
        console.error('Error verificando sesión:', error);
        res.status(500).json({ message: 'Algo salió mal', error });
    }
});
exports.verificarSesion = verificarSesion;
const cerrarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield auth_model_1.login.cerrarsesion();
        res.status(200).json(resultado);
    }
    catch (error) {
        console.error("Error en cerrarSesion:", error);
        res.status(500).json({ success: false, message: "Error inesperado" });
    }
});
exports.cerrarSesion = cerrarSesion;
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identidad, nombre, apellidos, rol, email, password } = req.body;
    if (!nombre || !apellidos || !email || !identidad) {
        return res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
    }
    if (!email_validator_1.default.validate(email)) {
        return res.status(400).json({ message: 'Correo electrónico inválido.' });
    }
    try {
        console.log("Entró al try");
        const resultado = yield auth_model_1.login.registrarusuario(identidad, nombre, apellidos, rol, email, password);
        return res.status(200).json(resultado);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.registrarUsuario = registrarUsuario;
