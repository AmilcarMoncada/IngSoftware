import supabase from '../utils/connection';

export const getIngresosPorDia = async () => {
  const { data: ingresos, error: err1 } = await supabase
    .from('tbl_registro_ingreso')
    .select('id_persona');
  if (err1) throw err1;

  const { data: estudiantes, error: err2 } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona');

  if (err2) throw err2;

  const { data: empleados, error: err3 } = await supabase
    .from('tbl_empleados')
    .select('id_persona');

  if (err3) throw err3;

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

  const { data: estudiantes, error: err2 } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona');

  if (err2) throw err2;

  const { data: empleados, error: err3 } = await supabase
    .from('tbl_empleados')
    .select('id_persona');

  if (err3) throw err3;

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

  const { data: estudiantes, error: err2 } = await supabase
    .from('tbl_estudiantes')
    .select('id_persona, id_centro_regional');

  if (err2) throw err2;

  const { data: centros, error: err3 } = await supabase
    .from('tbl_centros_regionales')
    .select('id_centro_regional, centro_regional');

  if (err3) throw err3;

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

    if (nombreCentro !== 'Desconocido') {  // Filtramos el "Desconocido"
      conteo[nombreCentro] = (conteo[nombreCentro] || 0) + 1;
    }
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

    if (metodo !== 'Desconocido') {  // Filtramos el "Desconocido"
      conteo[metodo] = (conteo[metodo] || 0) + 1;
    }
  });

  return Object.entries(conteo).map(([metodo_ingreso, cantidad_ingresos]) => ({
    metodo_ingreso,
    cantidad_ingresos,
  }));
};

export const getIngresosPorCarrera = async () => {
    const { data: ingresos, error: err1 } = await supabase
      .from('tbl_registro_ingreso')
      .select('id_persona');
  
    if (err1) throw err1;
  
    const { data: estudiantes, error: err2 } = await supabase
      .from('tbl_estudiantes')
      .select('id_persona, id_carrera');
  
    if (err2) throw err2;
  
    const { data: carreras, error: err3 } = await supabase
      .from('tbl_carreras')
      .select('id_carrera, nombre_carrera');
  
    if (err3) throw err3;
  
    const mapaCarrera = new Map(
      carreras?.map((c) => [c.id_carrera, c.nombre_carrera])
    );
  
    const conteo: Record<string, number> = {};
  
    ingresos?.forEach((registro) => {
      const carreraId = estudiantes?.find((e) => e.id_persona === registro.id_persona)?.id_carrera;
      const carreraNombre = carreraId ? mapaCarrera.get(carreraId) : null;
  
      if (carreraNombre) {
        conteo[carreraNombre] = (conteo[carreraNombre] || 0) + 1;
      }
    });
  
    return Object.entries(conteo).map(([carrera, cantidad_ingresos]) => ({
      carrera,
      cantidad_ingresos,
    }));
  };
  