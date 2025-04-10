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
    
    static async registrarusuario(identidad: string, nombres: string, apellidos: string, rol: number, email: string, password: string) {

      try {
          // 1. Registrar al usuario en Supabase
          const { data, error } = await supabase.auth.signUp({
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
          const uid = data.user?.id;
  
          if (!uid) {
              console.error('Error: UID no encontrado');
              throw new Error('UID no encontrado');
          }
  
          // 2. Si el registro es exitoso, llamar a la función RPC `handle_user_signup_ext` pasando el UID
          const { error: rpcError } = await supabase.rpc('handle_user_signup_ext', { uid });
  
          if (rpcError) {
              console.error('Error al ejecutar handle_user_signup_ext:', rpcError);
              throw new Error('Error al ejecutar handle_user_signup_ext');
          }
  
          // 3. Si todo está bien, devolver los datos del usuario
          return data;
  
      } catch (dbError) {
          console.error('Error de la base de datos:', dbError);
          throw new Error('Error al realizar la operación en la base de datos.');
      }
  }  
  

}