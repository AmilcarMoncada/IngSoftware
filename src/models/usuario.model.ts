import supabase from "../utils/connection";

export class usuario {

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



}