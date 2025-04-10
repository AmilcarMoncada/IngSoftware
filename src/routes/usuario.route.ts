import express from 'express';
import { obtenerCarreras, obtenerCentrosRegionales, eliminarPersona } from '../Controller/usuario.controller';

const router = express.Router();


router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);
router.delete('/eliminar/:idPersona', eliminarPersona);

export default router;