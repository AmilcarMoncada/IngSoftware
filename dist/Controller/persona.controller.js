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
exports.obtenerMotivosVisita = exports.obtenerCentrosRegionales = exports.obtenerCarreras = exports.obtenerPersonas = exports.registrarPersona = void 0;
const persona_model_1 = require("../models/persona.model");
const email_validator_1 = __importDefault(require("email-validator"));
const registrarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombres, apellidos, foto, correo, dni, descriptor_facial } = req.body;
    if (!nombres || !apellidos || !dni || !correo || !descriptor_facial) {
        res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
        return;
    }
    if (!email_validator_1.default.validate(correo)) {
        res.status(400).json({ message: 'Correo electrónico inválido.' });
        return;
    }
    try {
        const resultado = yield persona_model_1.persona.registrarpersona(nombres, apellidos, foto, correo, dni, descriptor_facial);
        res.status(200).json(resultado);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.registrarPersona = registrarPersona;
const obtenerPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield persona_model_1.persona.obtenerpersonas();
        res.status(200).json(carreras);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerPersonas = obtenerPersonas;
const obtenerCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield persona_model_1.persona.obtenercarreras();
        res.status(200).json(carreras);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerCarreras = obtenerCarreras;
const obtenerCentrosRegionales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centros = yield persona_model_1.persona.obtenercentrosregionales();
        res.status(200).json(centros);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerCentrosRegionales = obtenerCentrosRegionales;
const obtenerMotivosVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centros = yield persona_model_1.persona.obtenermotivosvisita();
        res.status(200).json(centros);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerMotivosVisita = obtenerMotivosVisita;
