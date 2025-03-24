import express from 'express';
import { registrarusuario, obtenerCarreras, obtenerCentrosRegionales } from '../Controller/usuario.controller';

const router = express.Router();

router.post('/registrar', registrarusuario);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);

export default router;