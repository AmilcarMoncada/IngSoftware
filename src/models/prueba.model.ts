import supabase from "../utils/connection";

export class prueba {
    static async funcionprueba(){
        const{data, error} = await supabase.rpc('p_obtener_roles');
        if(error){
            throw error;
        }
        return data;
    }
}