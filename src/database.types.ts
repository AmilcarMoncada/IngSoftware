export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  proyecto: {
    Tables: {
      tbl_areas: {
        Row: {
          id_area: number
          id_centro_regional: number | null
          nombre_area: string
          ubicacion: string | null
        }
        Insert: {
          id_area?: number
          id_centro_regional?: number | null
          nombre_area: string
          ubicacion?: string | null
        }
        Update: {
          id_area?: number
          id_centro_regional?: number | null
          nombre_area?: string
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_areas_id_centro_regional_fkey"
            columns: ["id_centro_regional"]
            isOneToOne: false
            referencedRelation: "tbl_centros_regionales"
            referencedColumns: ["id_centro_regional"]
          },
        ]
      }
      tbl_carreras: {
        Row: {
          id_carrera: number
          nombre_carrera: string
        }
        Insert: {
          id_carrera?: number
          nombre_carrera: string
        }
        Update: {
          id_carrera?: number
          nombre_carrera?: string
        }
        Relationships: []
      }
      tbl_centros_regionales: {
        Row: {
          centro_regional: string
          id_centro_regional: number
        }
        Insert: {
          centro_regional: string
          id_centro_regional?: number
        }
        Update: {
          centro_regional?: string
          id_centro_regional?: number
        }
        Relationships: []
      }
      tbl_empleados: {
        Row: {
          id_centro_regional: number
          id_persona: number
          id_puesto_empleado: number | null
          numero_empleado: number
        }
        Insert: {
          id_centro_regional: number
          id_persona: number
          id_puesto_empleado?: number | null
          numero_empleado?: number
        }
        Update: {
          id_centro_regional?: number
          id_persona?: number
          id_puesto_empleado?: number | null
          numero_empleado?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_empleados_id_centro_regional_fkey"
            columns: ["id_centro_regional"]
            isOneToOne: false
            referencedRelation: "tbl_centros_regionales"
            referencedColumns: ["id_centro_regional"]
          },
          {
            foreignKeyName: "tbl_empleados_id_persona_fkey"
            columns: ["id_persona"]
            isOneToOne: false
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
          {
            foreignKeyName: "tbl_empleados_id_puesto_empleado_fkey"
            columns: ["id_puesto_empleado"]
            isOneToOne: false
            referencedRelation: "tbl_puestos_empleados"
            referencedColumns: ["id_puesto"]
          },
        ]
      }
      tbl_estados: {
        Row: {
          estado: string
          id_estado: number
        }
        Insert: {
          estado: string
          id_estado?: number
        }
        Update: {
          estado?: string
          id_estado?: number
        }
        Relationships: []
      }
      tbl_estudiantes: {
        Row: {
          id_carrera: number
          id_centro_regional: number
          id_estado: number | null
          id_persona: number
          numero_cuenta: string
        }
        Insert: {
          id_carrera: number
          id_centro_regional: number
          id_estado?: number | null
          id_persona: number
          numero_cuenta: string
        }
        Update: {
          id_carrera?: number
          id_centro_regional?: number
          id_estado?: number | null
          id_persona?: number
          numero_cuenta?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_estudiantes_id_carrera_fkey"
            columns: ["id_carrera"]
            isOneToOne: false
            referencedRelation: "tbl_carreras"
            referencedColumns: ["id_carrera"]
          },
          {
            foreignKeyName: "tbl_estudiantes_id_centro_regional_fkey"
            columns: ["id_centro_regional"]
            isOneToOne: false
            referencedRelation: "tbl_centros_regionales"
            referencedColumns: ["id_centro_regional"]
          },
          {
            foreignKeyName: "tbl_estudiantes_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "tbl_estados"
            referencedColumns: ["id_estado"]
          },
          {
            foreignKeyName: "tbl_estudiantes_id_persona_fkey"
            columns: ["id_persona"]
            isOneToOne: false
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_guardias: {
        Row: {
          id_centro_regional: number | null
          id_guardia: number
          id_persona: number
          id_rol: number | null
          uuid_usuario: string | null
        }
        Insert: {
          id_centro_regional?: number | null
          id_guardia?: number
          id_persona: number
          id_rol?: number | null
          uuid_usuario?: string | null
        }
        Update: {
          id_centro_regional?: number | null
          id_guardia?: number
          id_persona?: number
          id_rol?: number | null
          uuid_usuario?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tbl_guardias_id_centro_regional_fkey"
            columns: ["id_centro_regional"]
            isOneToOne: false
            referencedRelation: "tbl_centros_regionales"
            referencedColumns: ["id_centro_regional"]
          },
          {
            foreignKeyName: "tbl_guardias_id_persona_fkey"
            columns: ["id_persona"]
            isOneToOne: false
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
          {
            foreignKeyName: "tbl_usuarios_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "tbl_roles"
            referencedColumns: ["id_rol"]
          },
        ]
      }
      tbl_metodos_ingreso: {
        Row: {
          id_metodo_ingreso: number
          metodo_ingreso: string
        }
        Insert: {
          id_metodo_ingreso?: number
          metodo_ingreso: string
        }
        Update: {
          id_metodo_ingreso?: number
          metodo_ingreso?: string
        }
        Relationships: []
      }
      tbl_motivos_visita: {
        Row: {
          descripcion: string
          id_motivo_visita: number
        }
        Insert: {
          descripcion: string
          id_motivo_visita?: number
        }
        Update: {
          descripcion?: string
          id_motivo_visita?: number
        }
        Relationships: []
      }
      tbl_personas: {
        Row: {
          apellidos: string | null
          correo: string | null
          descriptor_facial: Json | null
          dni: string | null
          fotografia: string | null
          id_persona: number
          nombres: string
        }
        Insert: {
          apellidos?: string | null
          correo?: string | null
          descriptor_facial?: Json | null
          dni?: string | null
          fotografia?: string | null
          id_persona?: number
          nombres: string
        }
        Update: {
          apellidos?: string | null
          correo?: string | null
          descriptor_facial?: Json | null
          dni?: string | null
          fotografia?: string | null
          id_persona?: number
          nombres?: string
        }
        Relationships: []
      }
      tbl_puestos_empleados: {
        Row: {
          id_puesto: number
          puesto: string | null
        }
        Insert: {
          id_puesto?: number
          puesto?: string | null
        }
        Update: {
          id_puesto?: number
          puesto?: string | null
        }
        Relationships: []
      }
      tbl_registro_ingreso: {
        Row: {
          fecha_hora_ingreso: string
          id_area: number | null
          id_centro_regional: number | null
          id_guardia: number
          id_metodo_ingreso: number
          id_motivo_visita: number
          id_persona: number
          id_registro: number
        }
        Insert: {
          fecha_hora_ingreso?: string
          id_area?: number | null
          id_centro_regional?: number | null
          id_guardia: number
          id_metodo_ingreso: number
          id_motivo_visita: number
          id_persona: number
          id_registro?: number
        }
        Update: {
          fecha_hora_ingreso?: string
          id_area?: number | null
          id_centro_regional?: number | null
          id_guardia?: number
          id_metodo_ingreso?: number
          id_motivo_visita?: number
          id_persona?: number
          id_registro?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_registro_ingreso_id_area_fkey"
            columns: ["id_area"]
            isOneToOne: false
            referencedRelation: "tbl_areas"
            referencedColumns: ["id_area"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_centro_regional_fkey"
            columns: ["id_centro_regional"]
            isOneToOne: false
            referencedRelation: "tbl_centros_regionales"
            referencedColumns: ["id_centro_regional"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_guardia_fkey"
            columns: ["id_guardia"]
            isOneToOne: false
            referencedRelation: "tbl_guardias"
            referencedColumns: ["id_guardia"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_metodo_ingreso_fkey"
            columns: ["id_metodo_ingreso"]
            isOneToOne: false
            referencedRelation: "tbl_metodos_ingreso"
            referencedColumns: ["id_metodo_ingreso"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_motivo_visita_fkey"
            columns: ["id_motivo_visita"]
            isOneToOne: false
            referencedRelation: "tbl_motivos_visita"
            referencedColumns: ["id_motivo_visita"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_persona_fkey"
            columns: ["id_persona"]
            isOneToOne: false
            referencedRelation: "tbl_personas"
            referencedColumns: ["id_persona"]
          },
        ]
      }
      tbl_roles: {
        Row: {
          descripcion_rol: string | null
          id_rol: number
          nombre_rol: string | null
        }
        Insert: {
          descripcion_rol?: string | null
          id_rol?: number
          nombre_rol?: string | null
        }
        Update: {
          descripcion_rol?: string | null
          id_rol?: number
          nombre_rol?: string | null
        }
        Relationships: []
      }
      tbl_turnos: {
        Row: {
          fecha_final: string | null
          fecha_inicio: string | null
          id_area: number
          id_guardia: number
          id_turno: number
        }
        Insert: {
          fecha_final?: string | null
          fecha_inicio?: string | null
          id_area: number
          id_guardia: number
          id_turno?: number
        }
        Update: {
          fecha_final?: string | null
          fecha_inicio?: string | null
          id_area?: number
          id_guardia?: number
          id_turno?: number
        }
        Relationships: [
          {
            foreignKeyName: "tbl_turnos_id_area_fkey"
            columns: ["id_area"]
            isOneToOne: false
            referencedRelation: "tbl_areas"
            referencedColumns: ["id_area"]
          },
          {
            foreignKeyName: "tbl_turnos_id_guardia_fkey"
            columns: ["id_guardia"]
            isOneToOne: false
            referencedRelation: "tbl_guardias"
            referencedColumns: ["id_guardia"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_user_signup_ext: {
        Args: Record<PropertyKey, never> | { uid: string }
        Returns: undefined
      }
      p_carreras: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_carrera: number
          carrera_unah: string
        }[]
      }
      p_centros_regionales: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_centro_regional: number
          centro_regional: string
        }[]
      }
      p_eliminar_persona: {
        Args: { p_id_usuario: number }
        Returns: {
          resultado: string
        }[]
      }
      p_insertar_guardia: {
        Args: {
          g_id_persona: number
          g_centro_regional: string
          g_rol: string
          g_uuid_usuario: string
        }
        Returns: {
          result_id_guardia: number
          id_persona: number
          id_centro_regional: number
          id_rol: number
          uuid_usuario: string
        }[]
      }
      p_insertar_persona: {
        Args: {
          p_nombres: string
          p_apellidos: string
          p_foto: string
          p_correo: string
          p_dni: string
          p_descriptor_facial: Json
        }
        Returns: {
          id_persona: number
          nombres: string
          apellidos: string
          foto: string
          correo: string
          dni: string
          descriptor_facial: Json
        }[]
      }
      p_insertar_registro_ingreso: {
        Args: {
          ri_id_persona: number
          ri_motivo_visita: string
          ri_metodo_ingreso: string
          ri_uuid_usuario: string
        }
        Returns: {
          result_id: number
        }[]
      }
      p_insertar_turno: {
        Args: { t_id_guardia: number; t_area: string }
        Returns: {
          id_turno: number
          id_guardia: number
          id_area: number
          fecha_inicio: string
          fecha_final: string
        }[]
      }
      p_motivos: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_motivo_visita: number
          descripcion: string
        }[]
      }
      p_obtener_areas: {
        Args:
          | Record<PropertyKey, never>
          | { id: number }
          | { nombre_centro: string }
        Returns: {
          id_area: number
          nombre_area: string
          ubicacion: string
        }[]
      }
      p_obtener_centros: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_centro_regional: number
          centro_regional: string
        }[]
      }
      p_obtener_personas: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_persona: number
          dni: string
          nombres: string
          apellidos: string
          descriptor_facial: Json
          fotografia: string
        }[]
      }
      p_obtener_rol_guardia: {
        Args: { uuid_guardia: string }
        Returns: {
          id_rol: number
        }[]
      }
      p_obtener_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_rol: number
          nombre_rol: string
          descripcion_rol: string
        }[]
      }
      p_verificar_duplicados: {
        Args: { p_correo: string; p_dni: string }
        Returns: {
          campo_duplicado: string
          valor: string
        }[]
      }
      p_verificar_duplicados_estudiantes: {
        Args: { p_numero_cuenta: string }
        Returns: {
          cuenta_econtrado: string
        }[]
      }
      p_verificar_empleado: {
        Args: { v_id_persona: number }
        Returns: {
          numero_empleado: string
          puesto: string
          centro_regional: string
        }[]
      }
      p_verificar_estudiante: {
        Args: { v_id_persona: number }
        Returns: {
          numero_cuenta: string
          nombre_carrera: string
          centro_regional: string
          estado: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  proyecto: {
    Enums: {},
  },
} as const
