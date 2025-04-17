import supabase from "../utils/connection";

export class login{

    static async iniciarsesion(email: string, password: string) {
      
        const { data, error } = await supabase.auth.signInWithPassword({
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
      }

      static async verificarsesion() {
          // Obtener la sesión actual
          const { data, error } = await supabase.auth.getSession();
      
          if (error) {
              console.error("Error obteniendo sesión:", error);
              return { isAuthenticated: false, message: "Error obteniendo sesión" };
          }
      
          if (data?.session) {
              //console.log("Sesión activa:", data.session);
              return { isAuthenticated: true, user: data.session.user };
          } else {
              //console.log("No hay sesión activa");
              return { isAuthenticated: false, message: "No hay sesión activa" };
          }
      }
      
      static async cerrarsesion() {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error("Error al cerrar sesión:", error);
            return { success: false, message: "Error al cerrar sesión" };
        }
    
        return { success: true, message: "Sesión cerrada correctamente" };
    }
    
    static async obtenerroles(){
        const {data ,error} = await supabase.rpc('p_obtener_roles')
        if (error) {
          console.error('Error al obtener los roles :vv:', error);
          throw new Error('Error al obtener los roles de los usuario');
        }
        return data;
      }

      static async obtenercentros(){
        const {data ,error} = await supabase.rpc('p_obtener_centros')
        if (error) {
          console.error('Error al obtener los centros regionales :vv:', error);
          throw new Error('Error al obtener los centros regionales');
        }
        return data;
      }

      static async obtenerareas(nombre_centro: string){
        const { data, error } = await supabase.rpc('p_obtener_areas', {
            nombre_centro: nombre_centro as unknown as never
        });
      
        if (error) {
          console.error('Error al obtener las áreas:', error);
          throw new Error('Error al obtener las áreas');
        }
      
        return data;
      }


  static async registrarusuario(identidad: string, nombre: string, apellidos: string, rol: string, centros: string, areas: string,  email: string, password: string, descriptor_facial: number[], foto: string) {

    try {
        // 1. Registrar al usuario en Supabase
        const { data: SigUpData, error: SigUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (SigUpError) {
            console.error('Error al insertar un nuevo usuario:', SigUpError);
            throw new Error('Error al insertar un nuevo usuario');
        }

        const uuid = SigUpData.user?.id;
        if (!uuid) {
            throw new Error('UUID no encontrado');
        }

        const { data: PersonaData, error: PersonaError } = await supabase.rpc('p_insertar_persona', {
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

        const {data: GuardiaData, error: GuardiaError} = await supabase.rpc('p_insertar_guardia', {g_id_persona: personaId, g_centro_regional: centros, g_rol: rol, g_uuid_usuario: uuid})

        if (GuardiaError) {
            console.error('Error al insertar un nuevo usuario:', PersonaError);
            throw new Error('Error al insertar un nuevo usuario');
        }
        
        if (!areas){
            return;
        } else {
            const guardiaId = GuardiaData[0].result_id_guardia;

        const {data: TurnoData, error: TurnoError } = await supabase.rpc('p_insertar_turno', {t_id_guardia: guardiaId, t_area: areas});

        if (TurnoError) {
            console.error('Error al insertar un turno:', TurnoError);
            throw new Error('Error al insertar un nuevo turno');
        }
        }
        

    } catch (dbError) {
        console.error('Error de la base de datos:', dbError);
        throw new Error('Error al realizar la operación en la base de datos.');
    }
}  


static async obtenerrolguardia(uuid_guardia: string){
    const { data, error } = await supabase.rpc('p_obtener_rol_guardia', {uuid_guardia: uuid_guardia});
  
    if (error) {
      console.error('Error al obtener las áreas:', error);
      throw new Error('Error al obtener las áreas');
    }
  
    return data;
  }

}