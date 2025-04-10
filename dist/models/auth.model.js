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
    static registrarusuario(identidad, nombres, apellidos, rol, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // 1. Registrar al usuario en Supabase
                const { data, error } = yield connection_1.default.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { identidad, nombres, apellidos, rol }
                    }
                });
                if (error) {
                    console.error('Error al insertar un nuevo usuario:', error);
                    throw new Error('Error al insertar un nuevo usuario');
                }
                // Obtener el UID del usuario recién registrado
                const uid = (_a = data.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!uid) {
                    console.error('Error: UID no encontrado');
                    throw new Error('UID no encontrado');
                }
                // 2. Si el registro es exitoso, llamar a la función RPC `handle_user_signup_ext` pasando el UID
                const { error: rpcError } = yield connection_1.default.rpc('handle_user_signup_ext', { uid });
                if (rpcError) {
                    console.error('Error al ejecutar handle_user_signup_ext:', rpcError);
                    throw new Error('Error al ejecutar handle_user_signup_ext');
                }
                // 3. Si todo está bien, devolver los datos del usuario
                return data;
            }
            catch (dbError) {
                console.error('Error de la base de datos:', dbError);
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
}
exports.login = login;
