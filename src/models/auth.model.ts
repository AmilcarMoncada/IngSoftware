import supabase from "../utils/connection";

export class login{

    static async loginUsuario(email: string, password: string) {
      
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

      static async verificarSesion() {
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
      
      static async cerrarSesion() {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error("Error al cerrar sesión:", error);
            return { success: false, message: "Error al cerrar sesión" };
        }
    
        return { success: true, message: "Sesión cerrada correctamente" };
    }
    
}