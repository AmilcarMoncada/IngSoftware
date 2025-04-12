// src/routes/ingresoRoutes.ts
import { Router } from 'express';
import * as ingresoController from '../Controller/ingreso.controller'; 
const router = Router();
console.log(ingresoController);

router.get('/por-dia', ingresoController.getIngresosPorDia);
router.get('/por-tipo', ingresoController.getIngresosPorTipo);
router.get('/por-centro', ingresoController.getIngresosPorCentro);
router.get('/por-metodo', ingresoController.getIngresosPorMetodo);

export default router;
