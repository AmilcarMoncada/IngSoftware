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
exports.usuario = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class usuario {
    static obtenercarreras() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_carreras');
            if (error) {
                console.error('Error al obtener carreras:', error);
                throw new Error('Error al obtener carreras');
            }
            return data;
        });
    }
    static obtenercentrosregionales() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_centros_regionales');
            if (error) {
                console.error('Error al obtener centros regionales:', error);
                throw new Error('Error al obtener centros regionales');
            }
            return data;
        });
    }
    static eliminarPersona(idPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_eliminar_persona', {
                p_id_usuario: idPersona
            });
            if (error) {
                console.error('Error al eliminar persona:', error);
                throw new Error('Error al eliminar persona.');
            }
            return data;
        });
    }
}
exports.usuario = usuario;
