import express from 'express';
import { hacerLogin, verSesion, cerrarSesion } from '../Controller/auth.controller';

const router = express.Router();

router.post('/login', hacerLogin);
router.get('/verificarLogin', verSesion);
router.post('/logout', cerrarSesion);


export default router;