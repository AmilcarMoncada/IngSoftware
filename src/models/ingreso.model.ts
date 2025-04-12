// src/models/ingresoModel.ts
import supabase from '../utils/connection';

export const getIngresosPorDia = async () => {
  const { data: ingresos, error: err1 } = await supabase
    .from('tbl_registro_ingreso')
    .select('id_persona');


  if (err1) throw err1;

  const { data: estudiantes } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona');

  const { data: empleados } = await supabase
    .from('tbl_empleados')
    .select('id_persona');

  const esEstudiante = new Set(estudiantes?.map((e) => e.id_persona));
  const esEmpleado = new Set(empleados?.map((e) => e.id_persona));

  const conteo: Record<string, number> = {
    Estudiante: 0,
    Empleado: 0,
    Visitante: 0,
  };

  ingresos?.forEach((registro) => {
    if (esEstudiante.has(registro.id_persona)) {
      conteo['Estudiante']++;
    } else if (esEmpleado.has(registro.id_persona)) {
      conteo['Empleado']++;
    } else {
      conteo['Visitante']++;
    }
  });

  return Object.entries(conteo).map(([tipo_persona, cantidad_ingresos]) => ({
    tipo_persona,
    cantidad_ingresos,
  }));
};

export const getIngresosPorTipo = async () => {
  const { data: ingresos, error: err1 } = await supabase
    .from('tbl_registro_ingreso')
    .select('id_persona');

  if (err1) throw err1;

  const { data: estudiantes } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona');

  const { data: empleados } = await supabase
    .from('tbl_empleados')
    .select('id_persona');

  const esEstudiante = new Set(estudiantes?.map((e) => e.id_persona));
  const esEmpleado = new Set(empleados?.map((e) => e.id_persona));

  const conteo: Record<string, number> = {
    Estudiante: 0,
    Empleado: 0,
    Visitante: 0,
  };

  ingresos?.forEach((registro) => {
    if (esEstudiante.has(registro.id_persona)) {
      conteo['Estudiante']++;
    } else if (esEmpleado.has(registro.id_persona)) {
      conteo['Empleado']++;
    } else {
      conteo['Visitante']++;
    }
  });

  return Object.entries(conteo).map(([tipo_persona, cantidad_ingresos]) => ({
    tipo_persona,
    cantidad_ingresos,
  }));
};

export const getIngresosPorCentro = async () => {
  const { data: ingresos, error: err1 } = await supabase
    .from('tbl_registro_ingreso')
    .select('id_persona');

  if (err1) throw err1;

  const { data: estudiantes } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona, id_centro_regional');

  const { data: centros } = await supabase
    .from('tbl_centros_regionales')
    .select('id_centro_regional, centro_regional');

  const mapaCentro = new Map(
    centros?.map((c) => [c.id_centro_regional, c.centro_regional])
  );

  const mapaEstudiante = new Map(
    estudiantes?.map((e) => [e.id_persona, e.id_centro_regional])
  );

  const conteo: Record<string, number> = {};

  ingresos?.forEach((registro) => {
    const idCentro = mapaEstudiante.get(registro.id_persona) ?? -1; // valor por defecto
    const nombreCentro = mapaCentro.get(idCentro) || 'Desconocido';
  
    conteo[nombreCentro] = (conteo[nombreCentro] || 0) + 1;
  });

  return Object.entries(conteo).map(([centro_regional, cantidad_ingresos]) => ({
    centro_regional,
    cantidad_ingresos,
  }));
};

export const getIngresosPorMetodo = async () => {
  const { data, error } = await supabase
    .from('tbl_registro_ingreso')
    .select(`
      id_metodo_ingreso,
      tbl_metodos_ingreso ( metodo_ingreso )
    `);

  if (error) throw error;

  const conteo: Record<string, number> = {};
  data?.forEach((registro) => {
    const metodo = registro.tbl_metodos_ingreso?.metodo_ingreso || 'Desconocido';
    conteo[metodo] = (conteo[metodo] || 0) + 1;
  });

  return Object.entries(conteo).map(([metodo_ingreso, cantidad_ingresos]) => ({
    metodo_ingreso,
    cantidad_ingresos,
  }));
};
