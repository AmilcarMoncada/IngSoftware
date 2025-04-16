import express from 'express';
import { iniciarSesion, verificarSesion, cerrarSesion, registrarUsuario, obtenerRoles, obtenerCentros, obtenerAreas } from '../Controller/auth.controller';

const router = express.Router();

router.post('/login', iniciarSesion);
router.get('/verificarLogin', verificarSesion);
router.post('/logout', cerrarSesion);
router.post('/signup', registrarUsuario);
router.get('/roles', obtenerRoles);
router.get('/centros', obtenerCentros);
router.post('/areas', obtenerAreas);



export default router;