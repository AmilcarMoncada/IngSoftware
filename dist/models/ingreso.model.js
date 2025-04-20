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
exports.getIngresosPorCarrera = exports.getIngresosPorMetodo = exports.getIngresosPorCentro = exports.getIngresosPorTipo = exports.getIngresosPorDia = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
const getIngresosPorDia = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: ingresos, error: err1 } = yield connection_1.default
        .from('tbl_registro_ingreso')
        .select('id_persona');
    if (err1)
        throw err1;
    const { data: estudiantes, error: err2 } = yield connection_1.default
        .from('tbl_estudiantes')
        .select('id_persona');
    if (err2)
        throw err2;
    const { data: empleados, error: err3 } = yield connection_1.default
        .from('tbl_empleados')
        .select('id_persona');
    if (err3)
        throw err3;
    const esEstudiante = new Set(estudiantes === null || estudiantes === void 0 ? void 0 : estudiantes.map((e) => e.id_persona));
    const esEmpleado = new Set(empleados === null || empleados === void 0 ? void 0 : empleados.map((e) => e.id_persona));
    const conteo = {
        Estudiante: 0,
        Empleado: 0,
        Visitante: 0,
    };
    ingresos === null || ingresos === void 0 ? void 0 : ingresos.forEach((registro) => {
        if (esEstudiante.has(registro.id_persona)) {
            conteo['Estudiante']++;
        }
        else if (esEmpleado.has(registro.id_persona)) {
            conteo['Empleado']++;
        }
        else {
            conteo['Visitante']++;
        }
    });
    return Object.entries(conteo).map(([tipo_persona, cantidad_ingresos]) => ({
        tipo_persona,
        cantidad_ingresos,
    }));
});
exports.getIngresosPorDia = getIngresosPorDia;
const getIngresosPorTipo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: ingresos, error: err1 } = yield connection_1.default
        .from('tbl_registro_ingreso')
        .select('id_persona');
    if (err1)
        throw err1;
    const { data: estudiantes, error: err2 } = yield connection_1.default
        .from('tbl_estudiantes')
        .select('id_persona');
    if (err2)
        throw err2;
    const { data: empleados, error: err3 } = yield connection_1.default
        .from('tbl_empleados')
        .select('id_persona');
    if (err3)
        throw err3;
    const esEstudiante = new Set(estudiantes === null || estudiantes === void 0 ? void 0 : estudiantes.map((e) => e.id_persona));
    const esEmpleado = new Set(empleados === null || empleados === void 0 ? void 0 : empleados.map((e) => e.id_persona));
    const conteo = {
        Estudiante: 0,
        Empleado: 0,
        Visitante: 0,
    };
    ingresos === null || ingresos === void 0 ? void 0 : ingresos.forEach((registro) => {
        if (esEstudiante.has(registro.id_persona)) {
            conteo['Estudiante']++;
        }
        else if (esEmpleado.has(registro.id_persona)) {
            conteo['Empleado']++;
        }
        else {
            conteo['Visitante']++;
        }
    });
    return Object.entries(conteo).map(([tipo_persona, cantidad_ingresos]) => ({
        tipo_persona,
        cantidad_ingresos,
    }));
});
exports.getIngresosPorTipo = getIngresosPorTipo;
const getIngresosPorCentro = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: ingresos, error: err1 } = yield connection_1.default
        .from('tbl_registro_ingreso')
        .select('id_persona');
    if (err1)
        throw err1;
    const { data: estudiantes, error: err2 } = yield connection_1.default
        .from('tbl_estudiantes')
        .select('id_persona, id_centro_regional');
    if (err2)
        throw err2;
    const { data: centros, error: err3 } = yield connection_1.default
        .from('tbl_centros_regionales')
        .select('id_centro_regional, centro_regional');
    if (err3)
        throw err3;
    const mapaCentro = new Map(centros === null || centros === void 0 ? void 0 : centros.map((c) => [c.id_centro_regional, c.centro_regional]));
    const mapaEstudiante = new Map(estudiantes === null || estudiantes === void 0 ? void 0 : estudiantes.map((e) => [e.id_persona, e.id_centro_regional]));
    const conteo = {};
    ingresos === null || ingresos === void 0 ? void 0 : ingresos.forEach((registro) => {
        var _a;
        const idCentro = (_a = mapaEstudiante.get(registro.id_persona)) !== null && _a !== void 0 ? _a : -1; // valor por defecto
        const nombreCentro = mapaCentro.get(idCentro) || 'Desconocido';
        if (nombreCentro !== 'Desconocido') { // Filtramos el "Desconocido"
            conteo[nombreCentro] = (conteo[nombreCentro] || 0) + 1;
        }
    });
    return Object.entries(conteo).map(([centro_regional, cantidad_ingresos]) => ({
        centro_regional,
        cantidad_ingresos,
    }));
});
exports.getIngresosPorCentro = getIngresosPorCentro;
const getIngresosPorMetodo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.default
        .from('tbl_registro_ingreso')
        .select(`
      id_metodo_ingreso,
      tbl_metodos_ingreso ( metodo_ingreso )
    `);
    if (error)
        throw error;
    const conteo = {};
    data === null || data === void 0 ? void 0 : data.forEach((registro) => {
        var _a;
        const metodo = ((_a = registro.tbl_metodos_ingreso) === null || _a === void 0 ? void 0 : _a.metodo_ingreso) || 'Desconocido';
        if (metodo !== 'Desconocido') { // Filtramos el "Desconocido"
            conteo[metodo] = (conteo[metodo] || 0) + 1;
        }
    });
    return Object.entries(conteo).map(([metodo_ingreso, cantidad_ingresos]) => ({
        metodo_ingreso,
        cantidad_ingresos,
    }));
});
exports.getIngresosPorMetodo = getIngresosPorMetodo;
const getIngresosPorCarrera = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data: ingresos, error: err1 } = yield connection_1.default
        .from('tbl_registro_ingreso')
        .select('id_persona');
    if (err1)
        throw err1;
    const { data: estudiantes, error: err2 } = yield connection_1.default
        .from('tbl_estudiantes')
        .select('id_persona, id_carrera');
    if (err2)
        throw err2;
    const { data: carreras, error: err3 } = yield connection_1.default
        .from('tbl_carreras')
        .select('id_carrera, nombre_carrera');
    if (err3)
        throw err3;
    const mapaCarrera = new Map(carreras === null || carreras === void 0 ? void 0 : carreras.map((c) => [c.id_carrera, c.nombre_carrera]));
    const conteo = {};
    ingresos === null || ingresos === void 0 ? void 0 : ingresos.forEach((registro) => {
        var _a;
        const carreraId = (_a = estudiantes === null || estudiantes === void 0 ? void 0 : estudiantes.find((e) => e.id_persona === registro.id_persona)) === null || _a === void 0 ? void 0 : _a.id_carrera;
        const carreraNombre = carreraId ? mapaCarrera.get(carreraId) : null;
        if (carreraNombre) {
            conteo[carreraNombre] = (conteo[carreraNombre] || 0) + 1;
        }
    });
    return Object.entries(conteo).map(([carrera, cantidad_ingresos]) => ({
        carrera,
        cantidad_ingresos,
    }));
});
exports.getIngresosPorCarrera = getIngresosPorCarrera;
