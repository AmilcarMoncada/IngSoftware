import { Console } from "console";
import supabase from "../utils/connection";

export class persona {

static async registrarpersona( nombres: string, apellidos: string, foto: string, correo: string, dni: string, descriptor_facial: number[]) {
  try {
    const { data: duplicados, error: errorDuplicados } = await supabase.rpc('p_verificar_duplicados', {
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

    const { data: PersonaData, error: PersonaError } = await supabase.rpc('p_insertar_persona', {
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
    } catch (dbError) {
      const error = dbError as Error;
      console.error('Error de la base de datos:', dbError);
      throw new Error('Error al realizar la operación en la base de datos.');
    }
  }

  static async registraringresopersona( id_persona: number, motivo_visita: string, metodo_ingreso: string, uuid_usuario: string) {
    try {
      console.log("LLEGO AL OTRO METODO");
      const { data: RegistroData, error: RegistroError } = await supabase.rpc('p_insertar_registro_ingreso', {
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
      } catch (dbError) {
        const error = dbError as Error;
        console.error('Error de la base de datos:', dbError);
        throw new Error('Error al realizar la operación en la base de datos.');
      }
  }

  static async verificarexisteestudiante( id_persona: number) {
    try {
      const { data: EstudianteData, error: EmpleadoError} = await supabase.rpc('p_verificar_estudiante', {v_id_persona: id_persona});
      console.log("LLEGO HASTA AQUI");

      if (EmpleadoError) {
        console.error('Error al encontrar el estudiante:', EmpleadoError);
        throw new Error('Error al buscar el estudiante');
      }

        return EstudianteData;
      } catch (dbError) {
        const error = dbError as Error;
        console.error('Error de la base de datos:', dbError);
        throw new Error('Error al realizar la operación en la base de datos.');
      }
  }

  static async verificarexisteempleado( id_persona: number) {
    try {
      const { data: EmpleadoData, error: EmpleadoError} = await supabase.rpc('p_verificar_empleado', {v_id_persona: id_persona});
      console.log("LLEGO HASTA AQUI");

      if (EmpleadoError) {
        console.error('Error al encontrar el empleado:', EmpleadoError);
        throw new Error('Error al buscar el empleado');
      }

        return EmpleadoData;
      } catch (dbError) {
        const error = dbError as Error;
        console.error('Error de la base de datos:', dbError);
        throw new Error('Error al realizar la operación en la base de datos.');
      }
  }

static async obtenerpersonas(){
  const {data, error} = await supabase.rpc('p_obtener_personas');
  if (error) {
    console.error('Error al obtener las personas para comparar:', error);
    throw new Error('Error al obtener las personas para comparar');
  }
  return data;
}

static async obtenercarreras() {
    const { data, error } = await supabase.rpc('p_carreras');
    if (error) {
        console.error('Error al obtener carreras:', error);
        throw new Error('Error al obtener carreras');
    }
    return data;
  }



static async obtenercentrosregionales() {
    const { data, error } = await supabase.rpc('p_centros_regionales');
    if (error) {
        console.error('Error al obtener centros regionales:', error);
        throw new Error('Error al obtener centros regionales');
    }
    return data;
  }


  static async eliminarPersona(idPersona: number){
    const {data, error} = await supabase.rpc('p_eliminar_persona',{
        p_id_usuario: idPersona
    });
    if (error) {
      console.error('Error al eliminar persona:', error);
      throw new Error('Error al eliminar persona.');
  }
    return data;
}



  static async obtenermotivosvisita() {
    const { data, error } = await supabase.rpc('p_motivos');
    if (error) {
        console.error('Error al obtener los motivos de visita:', error);
        throw new Error('Error al obtener los motivos de visita');
    }
    return data;
  }
  static async buscarestudianteporcuenta(numeroCuenta: string) {
    try {
      const { data, error } = await supabase.rpc('buscar_estudiante_por_cuenta', {
        p_numero_cuenta: numeroCuenta
      });
  
      if (error) {
        console.error('Error al buscar estudiante por número de cuenta:', error);
        throw new Error('Error al buscar estudiante por número de cuenta.');
      }
  
      return data;
    } catch (dbError) {
      const error = dbError as Error;
      console.error('Error de la base de datos:', dbError);
      throw new Error('Error al realizar la operación en la base de datos.');
    }
  }
  
  static async buscarpersonapordni(dni: string) {
    try {
      const { data, error } = await supabase.rpc('buscar_persona_por_dni', {
        p_dni: dni
      });
  
      if (error) {
        console.error('Error al buscar persona por DNI:', error);
        throw new Error('Error al buscar persona por DNI.');
      }
  
      return data;
    } catch (dbError) {
      const error = dbError as Error;
      console.error('Error de la base de datos:', dbError);
      throw new Error('Error al realizar la operación en la base de datos.');
    }
  }
  static async buscarpersonaporempleado(numeroEmpleado: string) {
    try {
      const { data, error } = await supabase.rpc('buscar_persona_por_numero_empleado', {
        p_numero_empleado: numeroEmpleado
      });
  
      if (error) {
        console.error('Error al buscar persona por número de empleado:', error);
        throw new Error('Error al buscar persona por número de empleado.');
      }
  
      return data;
    } catch (dbError) {
      const error = dbError as Error;
      console.error('Error de la base de datos:', dbError);
      throw new Error('Error al realizar la operación en la base de datos.');
    }
  }
  
  
}
