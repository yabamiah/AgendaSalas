import { Router } from 'express';
import { AgendamentoReservaController } from "../controllers/agendamentoReserva.controller.ts";

const router = Router();
const agendamentoController = new AgendamentoReservaController();

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Gerenciamento de agendamentos de reservas
 */

/**
 * @swagger
 * /api/agendamento-reserva:
 *   post:
 *     summary: Criar um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgendamentoReservaDTO'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgendamentoReserva'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', agendamentoController.criar);

/**
 * @swagger
 * /api/agendamento-reserva:
 *   get:
 *     summary: Listar todos os agendamentos
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: query
 *         name: detalhado
 *         schema:
 *           type: boolean
 *         description: Retorna detalhes da sala e responsável
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgendamentoReserva'
 */
router.get('/', agendamentoController.listarTodos);

/**
 * @swagger
 * /api/agendamento-reserva/verificar-conflito:
 *   get:
 *     summary: Verificar se existe conflito de horário
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: query
 *         name: sala_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *       - in: query
 *         name: horario_inicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Horário de início (ISO 8601)
 *       - in: query
 *         name: horario_final
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Horário final (ISO 8601)
 *       - in: query
 *         name: agendamento_id
 *         schema:
 *           type: integer
 *         description: ID do agendamento a ser excluído da verificação (útil para edições)
 *     responses:
 *       200:
 *         description: Resultado da verificação de conflito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conflito:
 *                   type: boolean
 *                   description: Indica se há conflito
 *                 agendamentos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AgendamentoReserva'
 */
router.get('/verificar-conflito', agendamentoController.verificarConflito);

/**
 * @swagger
 * /api/agendamento-reserva/buscar/periodo:
 *   get:
 *     summary: Listar agendamentos por período
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: query
 *         name: dataInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data de início do período (ISO 8601)
 *       - in: query
 *         name: dataFim
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data final do período (ISO 8601)
 *     responses:
 *       200:
 *         description: Lista de agendamentos no período
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgendamentoReserva'
 */
router.get('/buscar/periodo', agendamentoController.listarPorPeriodo);

/**
 * @swagger
 * /api/agendamento-reserva/sala/{id}:
 *   get:
 *     summary: Listar agendamentos de uma sala específica
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Lista de agendamentos da sala
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgendamentoReserva'
 */
router.get('/sala/:id', agendamentoController.listarPorSala);

/**
 * @swagger
 * /api/agendamento-reserva/responsavel/{id}:
 *   get:
 *     summary: Listar agendamentos de um responsável específico
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do responsável
 *     responses:
 *       200:
 *         description: Lista de agendamentos do responsável
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgendamentoReserva'
 */
router.get('/responsavel/:id', agendamentoController.listarPorResponsavel);

/**
 * @swagger
 * /api/agendamento-reserva/{id}:
 *   get:
 *     summary: Buscar agendamento por ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *       - in: query
 *         name: detalhado
 *         schema:
 *           type: boolean
 *         description: Retorna detalhes da sala e responsável
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgendamentoReserva'
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', agendamentoController.buscarPorId);

/**
 * @swagger
 * /api/agendamento-reserva/{id}:
 *   patch:
 *     summary: Atualizar agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sala_id:
 *                 type: integer
 *               responsavel_id:
 *                 type: integer
 *               horario_inicio:
 *                 type: string
 *                 format: date-time
 *               horario_final:
 *                 type: string
 *                 format: date-time
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgendamentoReserva'
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', agendamentoController.atualizar);

/**
 * @swagger
 * /api/agendamento-reserva/{id}:
 *   delete:
 *     summary: Deletar agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       204:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', agendamentoController.deletar);

export default router;