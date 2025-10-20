import { Router } from 'express';
import { SalaController } from "../controllers/sala.controller.ts";

const router = Router();
const salaController = new SalaController();

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Gerenciamento de salas
 */

/**
 * @swagger
 * /api/sala:
 *   post:
 *     summary: Criar uma nova sala
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalaDTO'
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sala'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', salaController.criar);

/**
 * @swagger
 * /api/sala:
 *   get:
 *     summary: Listar todas as salas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sala'
 */
router.get('/', salaController.listarTodas);

/**
 * @swagger
 * /api/sala/{id}:
 *   get:
 *     summary: Buscar sala por ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Sala encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sala'
 *       404:
 *         description: Sala não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', salaController.buscarPorId);

/**
 * @swagger
 * /api/sala/{id}:
 *   patch:
 *     summary: Atualizar sala
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sigla:
 *                 type: string
 *               nome:
 *                 type: string
 *               local:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sala'
 *       404:
 *         description: Sala não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', salaController.atualizar);

/**
 * @swagger
 * /api/sala/{id}:
 *   delete:
 *     summary: Deletar sala
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     responses:
 *       204:
 *         description: Sala deletada com sucesso
 *       404:
 *         description: Sala não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', salaController.deletar);

export default router;