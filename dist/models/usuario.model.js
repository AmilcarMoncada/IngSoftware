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
    static registrarusuario(nombres, apellidos, foto, correo, dni) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: duplicados, error: errorDuplicados } = yield connection_1.default.rpc('p_verificar_duplicados', {
                    p_correo: correo,
                    p_dni: dni
                });
                if (errorDuplicados) {
                    console.error('Error al verificar duplicados:', errorDuplicados);
                    throw new Error('Error al verificar duplicados.');
                }
                if (duplicados && duplicados.length > 0) {
                    const duplicado = duplicados[0];
                    throw new Error(`El campo '${duplicado.campo_duplicado}' con el valor '${duplicado.valor}' ya está en uso.`);
                }
                const { data: PersonaData, error: PersonaError } = yield connection_1.default.rpc('p_insertar_persona', {
                    p_nombres: nombres,
                    p_apellidos: apellidos,
                    p_foto: foto,
                    p_correo: correo,
                    p_dni: dni
                });
                if (PersonaError) {
                    console.error('Error al insertar persona:', PersonaError);
                    throw new Error('Error al insertar persona');
                }
                return PersonaData;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
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
}
exports.usuario = usuario;
