import { Router } from 'express';
import { UsuarioController } from "../controllers/usuarioController.ts";

const router = Router();
const usuarioController = new UsuarioController();

/**
 * @route   POST /api/usuario
 * @desc    Criar um novo usuário
 * @access  Public
 */
router.post('/', usuarioController.criar);

/**
 * @route   GET /api/usuario
 * @desc    Listar todos os usuários
 * @access  Public
 */
router.get('/', usuarioController.listarTodos);

/**
 * @route   GET /api/usuario/:id
 * @desc    Buscar usuário por ID
 * @access  Public
 */
router.get('/:id', usuarioController.buscarPorId);

/**
 * @route   PATCH /api/usuario/:id
 * @desc    Atualizar parcialmente usuário
 * @access  Public
 */
router.patch('/:id', usuarioController.atualizar);

/**
 * @route   DELETE /api/usuario/:id
 * @desc    Deletar usuário
 * @access  Public
 */
router.delete('/:id', usuarioController.deletar);

export default router;