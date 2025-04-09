import express from 'express';
import { iniciarSesion, verificarSesion, cerrarSesion, registrarUsuario } from '../Controller/auth.controller';

const router = express.Router();

router.post('/login', iniciarSesion);
router.get('/verificarLogin', verificarSesion);
router.post('/logout', cerrarSesion);
router.post('/signup', registrarUsuario);


export default router;