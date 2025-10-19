import { Router } from 'express';
import { AgendamentoReservaController } from "../controllers/agendamentoReserva.controller.ts";

const router = Router();
const agendamentoController = new AgendamentoReservaController();

/**
 * @route   POST /api/agendamento-reserva
 * @desc    Criar um novo agendamento
 * @access  Public
 */
router.post('/', agendamentoController.criar)

/**
 * @route   GET /api/agendamento-reserva
 * @desc    Listar todos os agendamentos
 * @query   ?detalhado=true (opcional)
 * @access  Public
 */
router.get('/', agendamentoController.listarTodos)

// ⚠️ ROTAS ESPECÍFICAS DEVEM VIR ANTES DAS ROTAS COM PARÂMETROS DINÂMICOS

/**
 * @route   GET /api/agendamento-reserva/verificar-conflito
 * @desc    Verificar se existe conflito de horário
 * @query   ?sala_id=1&horario_inicio=2025-10-20T09:00:00Z&horario_final=2025-10-20T10:00:00Z&agendamento_id=5 (opcional)
 * @access  Public
 */
router.get('/verificar-conflito', agendamentoController.verificarConflito);

/**
 * @route   GET /api/agendamento-reserva/buscar/periodo
 * @desc    Listar agendamentos por período
 * @query   ?dataInicio=2025-10-20T00:00:00Z&dataFim=2025-10-25T23:59:59Z
 * @access  Public
 */
router.get('/buscar/periodo', agendamentoController.listarPorPeriodo);

/**
 * @route   GET /api/agendamento-reserva/sala/:id
 * @desc    Listar agendamentos de uma sala específica
 * @access  Public
 */
router.get('/sala/:id', agendamentoController.listarPorSala)

/**
 * @route   GET /api/agendamento-reserva/responsavel/:id
 * @desc    Listar agendamentos de um responsável específico
 * @access  Public
 */
router.get('/responsavel/:id', agendamentoController.listarPorResponsavel)

/**
 * @route   GET /api/agendamento-reserva/:id
 * @desc    Buscar agendamento por ID
 * @query   ?detalhado=true (opcional)
 * @access  Public
 */
router.get('/:id', agendamentoController.buscarPorId)

/**
 * @route   PATCH /api/agendamento-reserva/:id
 * @desc    Atualizar agendamento
 * @access  Public
 */
router.patch('/:id', agendamentoController.atualizar);

/**
 * @route   DELETE /api/agendamento-reserva/:id
 * @desc    Deletar agendamento
 * @access  Public
 */
router.delete('/:id', agendamentoController.deletar);

export default router