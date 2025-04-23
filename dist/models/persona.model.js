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
exports.persona = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class persona {
    static registrarpersona(nombres, apellidos, foto, correo, dni, descriptor_facial) {
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
                if (Array.isArray(duplicados) && duplicados.length > 0) {
                    const duplicado = duplicados[0];
                    throw new Error(`El campo '${duplicado.campo_duplicado}' con el valor '${duplicado.valor}' ya está en uso.`);
                }
                const { data: PersonaData, error: PersonaError } = yield connection_1.default.rpc('p_insertar_persona', {
                    p_nombres: nombres,
                    p_apellidos: apellidos,
                    p_foto: foto,
                    p_correo: correo,
                    p_dni: dni,
                    p_descriptor_facial: descriptor_facial
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
    static registraringresopersona(id_persona, motivo_visita, metodo_ingreso, uuid_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("LLEGO AL OTRO METODO");
                const { data: RegistroData, error: RegistroError } = yield connection_1.default.rpc('p_insertar_registro_ingreso', {
                    ri_id_persona: id_persona,
                    ri_motivo_visita: motivo_visita,
                    ri_metodo_ingreso: metodo_ingreso,
                    ri_uuid_usuario: uuid_usuario
                });
                if (RegistroError) {
                    console.error('Error al insertar el registro:', RegistroError);
                    throw new Error('Error al insertar el registro');
                }
                return RegistroData;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static verificarexisteestudiante(id_persona) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: EstudianteData, error: EmpleadoError } = yield connection_1.default.rpc('p_verificar_estudiante', { v_id_persona: id_persona });
                console.log("LLEGO HASTA AQUI");
                if (EmpleadoError) {
                    console.error('Error al encontrar el estudiante:', EmpleadoError);
                    throw new Error('Error al buscar el estudiante');
                }
                return EstudianteData;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static verificarexisteempleado(id_persona) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: EmpleadoData, error: EmpleadoError } = yield connection_1.default.rpc('p_verificar_empleado', { v_id_persona: id_persona });
                console.log("LLEGO HASTA AQUI");
                if (EmpleadoError) {
                    console.error('Error al encontrar el empleado:', EmpleadoError);
                    throw new Error('Error al buscar el empleado');
                }
                return EmpleadoData;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static obtenerpersonas() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_personas');
            if (error) {
                console.error('Error al obtener las personas para comparar:', error);
                throw new Error('Error al obtener las personas para comparar');
            }
            return data;
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
    static obtenermotivosvisita() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_motivos');
            if (error) {
                console.error('Error al obtener los motivos de visita:', error);
                throw new Error('Error al obtener los motivos de visita');
            }
            return data;
        });
    }
    static buscarestudianteporcuenta(numeroCuenta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('buscar_estudiante_por_cuenta', {
                    p_numero_cuenta: numeroCuenta
                });
                if (error) {
                    console.error('Error al buscar estudiante por número de cuenta:', error);
                    throw new Error('Error al buscar estudiante por número de cuenta.');
                }
                return data;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static buscarpersonapordni(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('buscar_persona_por_dni', {
                    p_dni: dni
                });
                if (error) {
                    console.error('Error al buscar persona por DNI:', error);
                    throw new Error('Error al buscar persona por DNI.');
                }
                return data;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static buscarpersonaporempleado(numeroEmpleado) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('buscar_persona_por_numero_empleado', {
                    p_numero_empleado: numeroEmpleado
                });
                if (error) {
                    console.error('Error al buscar persona por número de empleado:', error);
                    throw new Error('Error al buscar persona por número de empleado.');
                }
                return data;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
}
exports.persona = persona;
