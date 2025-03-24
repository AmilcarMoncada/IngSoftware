import { usuario } from '../models/usuario.model'
import { Request, Response } from 'express'
import validator from 'email-validator';



export const registrarusuario = async (req: Request, res: Response): Promise<any> => {

    const { nombres, apellidos, foto, correo, dni} = req.body;

    if (!nombres || !apellidos || !dni || !correo) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    if (!validator.validate(correo)) {
      res.status(400).json({ message: 'Correo electrónico inválido.' });
      return;
    }

    try {
    const resultado = await usuario.registrarusuario( nombres, apellidos, foto, correo, dni);
      res.status(200).json(resultado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };







export const obtenerCarreras = async (req: Request, res: Response): Promise<any>=> {
    try {
        const carreras = await usuario.obtenercarreras();
        res.status(200).json(carreras);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };



export const obtenerCentrosRegionales = async (req: Request, res: Response): Promise<any>=> {
    try {
        const centros = await usuario.obtenercentrosregionales();
        res.status(200).json(centros);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };