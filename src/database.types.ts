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
          nombre_area: string
          ubicacion: string | null
        }
        Insert: {
          id_area?: number
          nombre_area: string
          ubicacion?: string | null
        }
        Update: {
          id_area?: number
          nombre_area?: string
          ubicacion?: string | null
        }
        Relationships: []
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
          id_puesto: number
          numero_empleado: string
        }
        Insert: {
          id_centro_regional: number
          id_persona: number
          id_puesto: number
          numero_empleado: string
        }
        Update: {
          id_centro_regional?: number
          id_persona?: number
          id_puesto?: number
          numero_empleado?: string
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
            foreignKeyName: "tbl_empleados_id_puesto_fkey"
            columns: ["id_puesto"]
            isOneToOne: false
            referencedRelation: "tbl_puestos"
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
          id_centro_regional: number
          id_guardia: number
          id_persona: number
          id_rol: number
        }
        Insert: {
          id_centro_regional: number
          id_guardia?: number
          id_persona: number
          id_rol: number
        }
        Update: {
          id_centro_regional?: number
          id_guardia?: number
          id_persona?: number
          id_rol?: number
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
            foreignKeyName: "tbl_guardias_id_rol_fkey"
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
          dni: string | null
          fotografia: string | null
          id_persona: number
          nombres: string
        }
        Insert: {
          apellidos?: string | null
          correo?: string | null
          dni?: string | null
          fotografia?: string | null
          id_persona?: number
          nombres: string
        }
        Update: {
          apellidos?: string | null
          correo?: string | null
          dni?: string | null
          fotografia?: string | null
          id_persona?: number
          nombres?: string
        }
        Relationships: []
      }
      tbl_puestos: {
        Row: {
          id_puesto: number
          nombre_puesto: string
        }
        Insert: {
          id_puesto?: number
          nombre_puesto: string
        }
        Update: {
          id_puesto?: number
          nombre_puesto?: string
        }
        Relationships: []
      }
      tbl_registro_ingreso: {
        Row: {
          fecha_hora_ingreso: string
          id_guardia: number
          id_metodo_ingreso: number
          id_motivo_visita: number
          id_persona: number
          id_registro: number
          metodo_ingreso: string
          resultado: string
        }
        Insert: {
          fecha_hora_ingreso?: string
          id_guardia: number
          id_metodo_ingreso: number
          id_motivo_visita: number
          id_persona: number
          id_registro?: number
          metodo_ingreso: string
          resultado: string
        }
        Update: {
          fecha_hora_ingreso?: string
          id_guardia?: number
          id_metodo_ingreso?: number
          id_motivo_visita?: number
          id_persona?: number
          id_registro?: number
          metodo_ingreso?: string
          resultado?: string
        }
        Relationships: [
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
          descripcion: string | null
          id_rol: number
          nombre_rol: string
          permisos: string | null
        }
        Insert: {
          descripcion?: string | null
          id_rol?: number
          nombre_rol: string
          permisos?: string | null
        }
        Update: {
          descripcion?: string | null
          id_rol?: number
          nombre_rol?: string
          permisos?: string | null
        }
        Relationships: []
      }
      tbl_turnos: {
        Row: {
          id: number
          id_area: number
          id_guardia: number
        }
        Insert: {
          id?: number
          id_area: number
          id_guardia: number
        }
        Update: {
          id?: number
          id_area?: number
          id_guardia?: number
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
        Args: {
          p_id_usuario: number
        }
        Returns: string
      }
      p_insertar_persona: {
        Args: {
          p_nombres: string
          p_apellidos: string
          p_foto: string
          p_correo: string
          p_dni: string
        }
        Returns: {
          id_persona: number
          nombres: string
          apellidos: string
          foto: string
          correo: string
          dni: string
        }[]
      }
      p_obtener_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_puesto: number
          nombre_puesto: string
        }[]
      }
      p_verificar_duplicados: {
        Args: {
          p_correo: string
          p_dni: string
        }
        Returns: {
          campo_duplicado: string
          valor: string
        }[]
      }
      p_verificar_duplicados_estudiantes: {
        Args: {
          p_numero_cuenta: string
        }
        Returns: {
          cuenta_econtrado: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
