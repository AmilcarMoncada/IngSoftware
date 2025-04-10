import { usuario } from '../models/usuario.model'
import { Request, Response } from 'express'
import validator from 'email-validator';




export const obtenerCarreras = async (req: Request, res: Response)=> {
    try {
        const carreras = await usuario.obtenercarreras();
        res.status(200).json(carreras);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };



export const obtenerCentrosRegionales = async (req: Request, res: Response)=> {
    try {
        const centros = await usuario.obtenercentrosregionales();
        res.status(200).json(centros);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };


export const eliminarPersona = async (req: Request, res: Response) => {
    try {
        const { idPersona } = req.params;
        
        const eliminar = await usuario.eliminarPersona(Number(idPersona));
        
        res.status(201).json({eliminar});
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
}