import express from 'express';
import { funcionprueba } from '../Controller/prueba.controller';

const router = express.Router();


router.get('/', funcionprueba);

export default router;

