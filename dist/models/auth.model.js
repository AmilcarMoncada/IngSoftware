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
exports.login = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class login {
    static iniciarsesion(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                //console.error('Error al realizar la autenticacion', error);
                throw new Error('Error al iniciar asesion');
                //return res.status(401).json({ error: error.message });
            }
            //console.log(data.session.access_token);
            return data;
            //return res.json({ token: data.session?.access_token });
        });
    }
    static verificarsesion() {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtener la sesión actual
            const { data, error } = yield connection_1.default.auth.getSession();
            if (error) {
                console.error("Error obteniendo sesión:", error);
                return { isAuthenticated: false, message: "Error obteniendo sesión" };
            }
            if (data === null || data === void 0 ? void 0 : data.session) {
                //console.log("Sesión activa:", data.session);
                return { isAuthenticated: true, user: data.session.user };
            }
            else {
                //console.log("No hay sesión activa");
                return { isAuthenticated: false, message: "No hay sesión activa" };
            }
        });
    }
    static cerrarsesion() {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield connection_1.default.auth.signOut();
            if (error) {
                console.error("Error al cerrar sesión:", error);
                return { success: false, message: "Error al cerrar sesión" };
            }
            return { success: true, message: "Sesión cerrada correctamente" };
        });
    }
    static obtenerroles() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_roles');
            if (error) {
                console.error('Error al obtener los roles :vv:', error);
                throw new Error('Error al obtener los roles de los usuario');
            }
            return data;
        });
    }
    static obtenercentros() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_centros');
            if (error) {
                console.error('Error al obtener los centros regionales :vv:', error);
                throw new Error('Error al obtener los centros regionales');
            }
            return data;
        });
    }
    static obtenerareas(nombre_centro) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_areas', {
                nombre_centro: nombre_centro
            });
            if (error) {
                console.error('Error al obtener las áreas:', error);
                throw new Error('Error al obtener las áreas');
            }
            return data;
        });
    }
    static registrarusuario(identidad, nombre, apellidos, rol, centros, areas, email, password, descriptor_facial, foto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // 1. Registrar al usuario en Supabase
                const { data: SigUpData, error: SigUpError } = yield connection_1.default.auth.signUp({
                    email,
                    password
                });
                if (SigUpError) {
                    console.error('Error al insertar un nuevo usuario:', SigUpError);
                    throw new Error('Error al insertar un nuevo usuario');
                }
                const uuid = (_a = SigUpData.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!uuid) {
                    throw new Error('UUID no encontrado');
                }
                const { data: PersonaData, error: PersonaError } = yield connection_1.default.rpc('p_insertar_persona', {
                    p_nombres: nombre,
                    p_apellidos: apellidos,
                    p_foto: foto,
                    p_correo: email,
                    p_dni: identidad,
                    p_descriptor_facial: descriptor_facial
                });
                if (PersonaError) {
                    console.error('Error al insertar un nuevo usuario:', PersonaError);
                    throw new Error('Error al insertar un nuevo usuario');
                }
                if (!PersonaData || PersonaData.length === 0) {
                    throw new Error('PersonaData es nulo o vacío');
                }
                const personaId = PersonaData[0].id_persona;
                const { data: GuardiaData, error: GuardiaError } = yield connection_1.default.rpc('p_insertar_guardia', { g_id_persona: personaId, g_centro_regional: centros, g_rol: rol, g_uuid_usuario: uuid });
                if (GuardiaError) {
                    console.error('Error al insertar un nuevo usuario:', PersonaError);
                    throw new Error('Error al insertar un nuevo usuario');
                }
                if (!areas) {
                    return;
                }
                else {
                    const guardiaId = GuardiaData[0].result_id_guardia;
                    const { data: TurnoData, error: TurnoError } = yield connection_1.default.rpc('p_insertar_turno', { t_id_guardia: guardiaId, t_area: areas });
                    if (TurnoError) {
                        console.error('Error al insertar un turno:', TurnoError);
                        throw new Error('Error al insertar un nuevo turno');
                    }
                }
            }
            catch (dbError) {
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static obtenerrolguardia(uuid_guardia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_rol_guardia', { uuid_guardia: uuid_guardia });
            if (error) {
                console.error('Error al obtener las áreas:', error);
                throw new Error('Error al obtener las áreas');
            }
            return data;
        });
    }
    static obtenerdatosguardia(uuid_guardia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_datos_guardia', { uuid_guardia: uuid_guardia });
            if (error) {
                console.error('Error al obtener las áreas:', error);
                throw new Error('Error al obtener las áreas');
            }
            return data;
        });
    }
}
exports.login = login;
