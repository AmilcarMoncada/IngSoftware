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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPersona = exports.obtenerCentrosRegionales = exports.obtenerCarreras = void 0;
const usuario_model_1 = require("../models/usuario.model");
const obtenerCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield usuario_model_1.usuario.obtenercarreras();
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
        const centros = yield usuario_model_1.usuario.obtenercentrosregionales();
        res.status(200).json(centros);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerCentrosRegionales = obtenerCentrosRegionales;
const eliminarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idPersona } = req.params;
        const eliminar = yield usuario_model_1.usuario.eliminarPersona(Number(idPersona));
        res.status(201).json({ eliminar });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.eliminarPersona = eliminarPersona;
