import express from 'express';
import { registrarPersona, obtenerCarreras, obtenerCentrosRegionales, obtenerPersonas, obtenerMotivosVisita, registrarIngresoPersona } from '../Controller/persona.controller';

const router = express.Router();

router.post('/registrar', registrarPersona);
router.post('/registrarIngreso', registrarIngresoPersona);
router.get('/obtener', obtenerPersonas);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);
router.get('/motivos', obtenerMotivosVisita);

export default router;