import express from 'express';
import { registrarPersona, obtenerCarreras, obtenerCentrosRegionales, obtenerPersonas } from '../Controller/persona.controller';

const router = express.Router();

router.post('/registrar', registrarPersona);
router.get('/obtener', obtenerPersonas);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);

export default router;