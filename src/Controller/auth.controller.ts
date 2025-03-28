import { login } from "../models/auth.model";
import {Request, Response} from 'express';
import validator from "email-validator";

export const hacerLogin = async (req: Request, res: Response): Promise<any> => {
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
        const resultado = await login.loginUsuario(correo, password);
        res.status(200).json(resultado);
        return resultado;
    } catch (error: unknown){
        if (error instanceof Error){
            res.status(500).json({ message: error.message });
            
        }
    }
}

export const verSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const resultado = await login.verificarSesion();
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error verificando sesión:', error);
        res.status(500).json({ message: 'Algo salió mal', error });
    }
};


export const cerrarSesion = async (req: Request, res: Response): Promise<any> => {
    try {
        const resultado = await login.cerrarSesion();
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error en cerrarSesion:", error);
        res.status(500).json({ success: false, message: "Error inesperado" });
    }
};
