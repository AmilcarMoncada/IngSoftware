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
  
  export const registrarIngresoPersona = async (req: Request, res: Response): Promise<any> => {

    const { id_persona, motivo_visita, metodo_ingreso, uuid_usuario} = req.body;

    if (!id_persona || !motivo_visita || !metodo_ingreso || !uuid_usuario) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    try {
    const resultado = await persona.registraringresopersona(id_persona, motivo_visita, metodo_ingreso, uuid_usuario);
      res.status(200).json(resultado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  export const verificarExisteEstudiante = async (req: Request, res: Response): Promise<any> => {

    const { id_persona } = req.body;

    if (!id_persona) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    try {
    const resultado = await persona.verificarexisteestudiante(id_persona);
      res.status(200).json(resultado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  export const verificarExisteEmpelado = async (req: Request, res: Response): Promise<any> => {

    const { id_persona } = req.body;

    if (!id_persona) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    try {
    const resultado = await persona.verificarexisteempleado(id_persona);
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
export const obtenerMotivosVisita = async (req: Request, res: Response): Promise<any>=> {
  try {
      const centros = await persona.obtenermotivosvisita();
      res.status(200).json(centros);
  } catch (error: unknown) {
    if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  }
  }
};
export const buscarEstudiantePorCuenta = async (req: Request, res: Response): Promise<any> => {
  const { numeroCuenta } = req.query;

  console.log("Número de cuenta recibido:", numeroCuenta); // Verificar que el parámetro esté llegando

  if (!numeroCuenta || typeof numeroCuenta !== 'string') {
    res.status(400).json({ message: 'El número de cuenta es requerido.' });
    return;
  }

  try {
    const resultado = await persona.buscarestudianteporcuenta(numeroCuenta);
    res.status(200).json(resultado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};


export const buscarPersonaPorDni = async (req: Request, res: Response): Promise<any> => {
  const { dni } = req.query;

  if (!dni || typeof dni !== 'string') {
    res.status(400).json({ message: 'El número de identidad (DNI) es requerido.' });
    return;
  }

  try {
    const resultado = await persona.buscarpersonapordni(dni);
    res.status(200).json(resultado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const buscarPersonaPorNumeroEmpleado = async (req: Request, res: Response): Promise<any> => {
  const { numeroEmpleado } = req.query;
  console.log("Número de empleado recibido:", numeroEmpleado); // Verificar que el parámetro esté llegando

  // Verificar si el número de empleado es un número entero
  if (!numeroEmpleado || isNaN(Number(numeroEmpleado))) {
    res.status(400).json({ message: 'El número de empleado debe ser un valor numérico.' });
    return;
  }

  // Convertir numeroEmpleado a número entero
  const numeroEmpleadoInt = parseInt(numeroEmpleado as string, 10);

  try {
    // Llamada a la función para buscar persona por número de empleado
    const resultado = await persona.buscarpersonaporempleado(numeroEmpleadoInt); // Pasar número entero
    res.status(200).json(resultado);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al buscar persona por número de empleado:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
};


//Comentario de prueba