// src/Controller/ingreso.controller.ts
import { Request, Response } from 'express';
import * as ingresoModel from '../models/ingreso.model';

export const getIngresosPorDia = async (req: Request, res: Response) => {
  try {
    const resultado = await ingresoModel.getIngresosPorDia();
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ingresos por día' });
  }
};

export const getIngresosPorTipo = async (req: Request, res: Response) => {
  try {
    const resultado = await ingresoModel.getIngresosPorTipo();
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ingresos por tipo de persona' });
  }
};

export const getIngresosPorCentro = async (req: Request, res: Response) => {
  try {
    const resultado = await ingresoModel.getIngresosPorCentro();
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ingresos por centro regional' });
  }
};

export const getIngresosPorMetodo = async (req: Request, res: Response) => {
  try {
    const resultado = await ingresoModel.getIngresosPorMetodo();
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ingresos por método de ingreso' });
  }
};
export const getIngresosPorCarrera = async (req: Request, res: Response) => {
    try {
      const resultado = await ingresoModel.getIngresosPorCarrera();
      res.json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener ingresos por carrera' });
    }
  };
 