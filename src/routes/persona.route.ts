import express from 'express';
import { registrarPersona, obtenerCarreras, obtenerCentrosRegionales, obtenerPersonas, obtenerMotivosVisita } from '../Controller/persona.controller';

const router = express.Router();

router.post('/registrar', registrarPersona);
router.get('/obtener', obtenerPersonas);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);
router.get('/motivos', obtenerMotivosVisita);

export default router;