import { persona } from '../models/persona.model'
import { Request, Response } from 'express'
import validator from 'email-validator';



export const registrarPersona = async (req: Request, res: Response): Promise<any> => {

    const { nombres, apellidos, foto, correo, dni, descriptor_facial} = req.body;

    if (!nombres || !apellidos || !dni || !correo || !descriptor_facial) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    if (!validator.validate(correo)) {
      res.status(400).json({ message: 'Correo electrónico inválido.' });
      return;
    }

    try {
    const resultado = await persona.registrarpersona( nombres, apellidos, foto, correo, dni, descriptor_facial);
      res.status(200).json(resultado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };
  

  export const obtenerPersonas = async (req: Request, res: Response): Promise<any>=> {
    try {
        const carreras = await persona.obtenerpersonas();
        res.status(200).json(carreras);
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ message: error.message });
        }
      }
  };


export const obtenerCarreras = async (req: Request, res: Response): Promise<any>=> {
    try {
        const carreras = await persona.obtenercarreras();
        res.status(200).json(carreras);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };



export const obtenerCentrosRegionales = async (req: Request, res: Response): Promise<any>=> {
    try {
        const centros = await persona.obtenercentrosregionales();
        res.status(200).json(centros);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };