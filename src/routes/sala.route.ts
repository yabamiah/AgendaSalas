import { Router } from 'express';
import { SalaController } from "../controllers/sala.controller.ts";

const router = Router();
const salaController = new SalaController();

router.post('/', salaController.criar);

router.get('/', salaController.listarTodas);

router.get('/:id', salaController.buscarPorId);

router.patch('/:id', salaController.atualizar);

router.delete('/:id', salaController.deletar);

export default router