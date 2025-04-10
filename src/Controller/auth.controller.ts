import { login } from "../models/auth.model";
import {Request, Response} from 'express';
import validator from "email-validator";
import supabase from "../utils/connection";

export const iniciarSesion = async (req: Request, res: Response): Promise<any> => {
    //console.log("Estoy aqui")
    const {correo, password} = req.body;
    
    if (!correo || !password) {
        res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
        return;
      }

    if (!validator.validate(correo)) {
      res.status(400).json({ message: 'Correo electrónico inválido.' });
      return;
    }

    try {
        const resultado = await login.iniciarsesion(correo, password);
        res.status(200).json(resultado);
        return resultado;
    } catch (error: unknown){
        if (error instanceof Error){
            res.status(500).json({ message: error.message });
            
        }
    }
}

export const verificarSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const resultado = await login.verificarsesion();
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error verificando sesión:', error);
        res.status(500).json({ message: 'Algo salió mal', error });
    }
};


export const cerrarSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const resultado = await login.cerrarsesion();
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en cerrarSesion:", error);
        res.status(500).json({ success: false, message: "Error inesperado" });
    }
};

export const registrarUsuario = async (req: Request, res: Response): Promise<any> => {
  const { identidad, nombre, apellidos, rol, email, password } = req.body;

  if (!nombre || !apellidos || !email || !identidad) {
    return res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ message: 'Correo electrónico inválido.' });
  }

  try {
    console.log("Entró al try");

    const resultado = await login.registrarusuario( identidad, nombre, apellidos, rol, email, password );

    return res.status(200).json(resultado);

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
