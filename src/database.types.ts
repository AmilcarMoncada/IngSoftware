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
      tbl_empleados: {
        Row: {
          apellido: string
          foto_perfil: string | null
          id_puesto: number
          nombre: string
          numero_empleado: string
        }
        Insert: {
          apellido: string
          foto_perfil?: string | null
          id_puesto: number
          nombre: string
          numero_empleado: string
        }
        Update: {
          apellido?: string
          foto_perfil?: string | null
          id_puesto?: number
          nombre?: string
          numero_empleado?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_empleados_id_puesto_fkey"
            columns: ["id_puesto"]
            isOneToOne: false
            referencedRelation: "tbl_puestos"
            referencedColumns: ["id_puesto"]
          },
        ]
      }
      tbl_estudiantes: {
        Row: {
          apellido: string
          foto_perfil: string | null
          id_carrera: number
          nombre: string
          numero_cuenta: string
        }
        Insert: {
          apellido: string
          foto_perfil?: string | null
          id_carrera: number
          nombre: string
          numero_cuenta: string
        }
        Update: {
          apellido?: string
          foto_perfil?: string | null
          id_carrera?: number
          nombre?: string
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
        ]
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
          fecha_hora_ingreso: string | null
          id_empleado: string | null
          id_estudiante: string | null
          id_registro: number
          id_usuario_sistema: number | null
          id_visitante: number | null
          metodo_ingreso: string
          resultado: string
        }
        Insert: {
          fecha_hora_ingreso?: string | null
          id_empleado?: string | null
          id_estudiante?: string | null
          id_registro?: number
          id_usuario_sistema?: number | null
          id_visitante?: number | null
          metodo_ingreso: string
          resultado: string
        }
        Update: {
          fecha_hora_ingreso?: string | null
          id_empleado?: string | null
          id_estudiante?: string | null
          id_registro?: number
          id_usuario_sistema?: number | null
          id_visitante?: number | null
          metodo_ingreso?: string
          resultado?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_registro_ingreso_id_empleado_fkey"
            columns: ["id_empleado"]
            isOneToOne: false
            referencedRelation: "tbl_empleados"
            referencedColumns: ["numero_empleado"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_estudiante_fkey"
            columns: ["id_estudiante"]
            isOneToOne: false
            referencedRelation: "tbl_estudiantes"
            referencedColumns: ["numero_cuenta"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_usuario_sistema_fkey"
            columns: ["id_usuario_sistema"]
            isOneToOne: false
            referencedRelation: "tbl_usuarios"
            referencedColumns: ["id_usuario"]
          },
          {
            foreignKeyName: "tbl_registro_ingreso_id_visitante_fkey"
            columns: ["id_visitante"]
            isOneToOne: false
            referencedRelation: "tbl_visitantes"
            referencedColumns: ["id_visitante"]
          },
        ]
      }
      tbl_roles: {
        Row: {
          id_rol: number
          nombre_rol: string
        }
        Insert: {
          id_rol?: number
          nombre_rol: string
        }
        Update: {
          id_rol?: number
          nombre_rol?: string
        }
        Relationships: []
      }
      tbl_usuarios: {
        Row: {
          apellido_usuario: string
          contrasena_hash: string
          id_rol: number
          id_usuario: number
          nombre_usuario: string
        }
        Insert: {
          apellido_usuario: string
          contrasena_hash: string
          id_rol: number
          id_usuario?: number
          nombre_usuario: string
        }
        Update: {
          apellido_usuario?: string
          contrasena_hash?: string
          id_rol?: number
          id_usuario?: number
          nombre_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_usuarios_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "tbl_roles"
            referencedColumns: ["id_rol"]
          },
        ]
      }
      tbl_visitantes: {
        Row: {
          apellido: string
          foto_perfil: string | null
          id_motivo_visita: number
          id_visitante: number
          nombre: string
          numero_identidad: string
        }
        Insert: {
          apellido: string
          foto_perfil?: string | null
          id_motivo_visita: number
          id_visitante?: number
          nombre: string
          numero_identidad: string
        }
        Update: {
          apellido?: string
          foto_perfil?: string | null
          id_motivo_visita?: number
          id_visitante?: number
          nombre?: string
          numero_identidad?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbl_visitantes_id_motivo_visita_fkey"
            columns: ["id_motivo_visita"]
            isOneToOne: false
            referencedRelation: "tbl_motivos_visita"
            referencedColumns: ["id_motivo_visita"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      p_obtener_roles: {
        Args: Record<PropertyKey, never>
        Returns: {
          id_rol: number
          nombre_rol: string
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
