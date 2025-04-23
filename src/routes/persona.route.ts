import express from 'express';
import { registrarPersona, obtenerCarreras, obtenerCentrosRegionales, obtenerPersonas, obtenerMotivosVisita, registrarIngresoPersona, verificarExisteEstudiante, verificarExisteEmpelado, buscarEstudiantePorCuenta, buscarPersonaPorDni, buscarPersonaPorNumeroEmpleado } from '../Controller/persona.controller';

const router = express.Router();

router.post('/registrar', registrarPersona);
router.post('/registrarIngreso', registrarIngresoPersona);
router.post('/verificarEstudiante', verificarExisteEstudiante);
router.post('/verificarEmpleado', verificarExisteEmpelado);
router.get('/obtener', obtenerPersonas);
router.get('/carreras', obtenerCarreras);
router.get('/centros', obtenerCentrosRegionales);
router.get('/motivos', obtenerMotivosVisita);
router.get('/buscarEstudiante', buscarEstudiantePorCuenta);
router.get('/buscarPorDni', buscarPersonaPorDni);
router.get('/buscarPorNumeroEmpleado', buscarPersonaPorNumeroEmpleado);

export default router;