import { type Request, type Response } from 'express'
import { AgendamentoReservaService } from "../services/agendamentoReserva.service.ts";
import { AgendamentoReservaDTOSchema } from "../schemas/agendamentoReserva.schema.ts";
import * as z from 'zod';

const agendamentoReservaService = new AgendamentoReservaService();

export class AgendamentoReservaController {
    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const agendamentoReservaDTO = AgendamentoReservaDTOSchema.parse(req.body);

            const resultado = await agendamentoReservaService.criar(agendamentoReservaDTO);

            if (resultado.dados) {
                return res.status(201).json({
                    mensagem: 'Agendamento criado com sucesso',
                    dados: resultado.dados
                });
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            if(error instanceof z.ZodError)  {
                return res.status(400).json({
                    error: error.message
                })
            }

            console.error('Erro no controller ao criar agendamento:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async buscarPorId(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id as string);

            if (isNaN(id)) {
                return res.status(400).json({
                    erro: 'ID inválido'
                });
            }

            const resultado = await agendamentoReservaService.buscarPorId(id);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(404).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao buscar agendamento:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async listarTodos(req: Request, res: Response): Promise<Response> {
        try {
            const resultado = await agendamentoReservaService.listarTodos();

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao listar agendamentos:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async listarPorSala(req: Request, res: Response): Promise<Response> {
        try {
            const salaId = parseInt(req.params.id as string);

            if (isNaN(salaId)) {
                return res.status(400).json({
                    erro: 'ID da sala inválido'
                });
            }

            const resultado = await agendamentoReservaService.listarPorSala(salaId);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao listar agendamentos por sala:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async listarPorResponsavel(req: Request, res: Response): Promise<Response> {
        try {
            const responsavelId = parseInt(req.params.id as string);

            if (isNaN(responsavelId)) {
                return res.status(400).json({
                    erro: 'ID do responsável inválido'
                });
            }

            const resultado = await agendamentoReservaService.listarPorResponsavel(responsavelId);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao listar agendamentos por responsável:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async listarPorPeriodo(req: Request, res: Response): Promise<Response> {
        try {
            const { dataInicio, dataFim } = req.query;

            if (!dataInicio || !dataFim) {
                return res.status(400).json({
                    erro: 'dataInicio e dataFim são obrigatórios'
                });
            }

            const inicio = new Date(dataInicio as string);
            const fim = new Date(dataFim as string);

            if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
                return res.status(400).json({
                    erro: 'Datas inválidas. Use o formato ISO 8601 (ex: 2025-10-20T00:00:00Z)'
                });
            }

            const resultado = await agendamentoReservaService.listarPorPeriodo(inicio, fim);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao listar agendamentos por período:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async verificarConflito(req: Request, res: Response): Promise<Response> {
        try {
            const { sala_id, horario_inicio, horario_final, agendamento_id } = req.query;

            if (!sala_id || !horario_inicio || !horario_final) {
                return res.status(400).json({
                    erro: 'sala_id, horario_inicio e horario_final são obrigatórios'
                });
            }

            const salaId = parseInt(sala_id as string);
            const inicio = new Date(horario_inicio as string);
            const final = new Date(horario_final as string);
            const agendamentoId = agendamento_id ? parseInt(agendamento_id as string) : undefined;

            if (isNaN(salaId)) {
                return res.status(400).json({
                    erro: 'ID da sala inválido'
                });
            }

            if (isNaN(inicio.getTime()) || isNaN(final.getTime())) {
                return res.status(400).json({
                    erro: 'Horários inválidos. Use o formato ISO 8601'
                });
            }

            if (final <= inicio) {
                return res.status(400).json({
                    erro: 'Horário final deve ser após o horário inicial'
                });
            }

            const conflito = await agendamentoReservaService.verificarConflito(salaId, inicio, final, agendamentoId);

            return res.status(200).json({
                conflito: conflito.sucesso,
                mensagem: conflito.sucesso
                    ? 'Horãrio não está disponível'
                    : 'Horario disponível'
            });
        } catch (error) {
            console.error('Erro no controller ao verificar conflito:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id as string);

            if (isNaN(id)) {
                return res.status(400).json({
                    erro: 'ID inválido'
                });
            }

            const resultado = await agendamentoReservaService.atualizar(id, req.body);

            if (resultado.dados) {
                return res.status(200).json({
                    mensagem: 'Agendamento atualizado com sucesso',
                    dados: resultado.dados
                });
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao atualizar agendamento:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async deletar(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id as string);

            if (isNaN(id)) {
                return res.status(400).json({
                    erro: 'ID inválido'
                });
            }

            const resultado = await agendamentoReservaService.deletar(id);

            if (resultado.sucesso) {
                return res.status(200).json({
                    mensagem: 'Agendamento deletado com sucesso'
                });
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            console.error('Erro no controller ao deletar agendamento:', error);
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }
}