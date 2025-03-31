import supabase from "../utils/connection";

export class persona {

static async registrarpersona( nombres: string, apellidos: string, foto: string, correo: string, dni: string, descriptor_facial: string) {
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

static async obtenerpersonas(){
  const {data, error} = await supabase.rpc('p_obtener_personas');
  if (error) {
    console.error('Error al obtener las personas:', error);
    throw new Error('Error al obtener las personas');
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

  
}