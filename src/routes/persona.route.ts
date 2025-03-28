import express from 'express';
import { registrarPersona, obtenerCarreras, obtenerCentrosRegionales } from '../Controller/persona.controller';

const router = express.Router();

router.post('/registrar', registrarPersona);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);

export default router;