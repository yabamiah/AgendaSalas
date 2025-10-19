import { AgendamentoReservaRepository } from "../repositories/agendamentoReserva.repository.ts";
import { type AgendamentoReserva, type AgendamentoReservaDTO } from "../schemas/agendamentoReserva.schema.ts";
import { SalaRepository } from "../repositories/sala.repository.ts";
import { UsuarioRepository } from "../repositories/usuario.repository.ts";

export class AgendamentoReservaService{
    private repository: AgendamentoReservaRepository;
    private salaRepository: SalaRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.repository = new AgendamentoReservaRepository();
        this.salaRepository = new SalaRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    async criar(agendamentoReserva: AgendamentoReservaDTO): Promise<{dados?: AgendamentoReserva, erro?: string}> {
        try {
            const sala = await this.salaRepository.buscarPorId(agendamentoReserva.sala_id);
            if (!sala) {
                return {
                    erro: 'Sala não encontrada'
                };
            }

            const responsavel = await this.usuarioRepository.buscarPorId(agendamentoReserva.responsavel_id);
            if (!responsavel) {
                return {
                    erro: 'Responsável não encontrado'
                };
            }

            const inicio = new Date(agendamentoReserva.horario_inicio);
            const fim = new Date(agendamentoReserva.horario_final);

            if (inicio >= fim) {
                return {
                    erro: 'O horário de início deve ser anterior ao horário final'
                };
            }

            const temConflito = await this.repository.verificarConflito(
                agendamentoReserva.sala_id,
                inicio,
                fim
            );

            if (temConflito) {
                return {
                    erro: 'Já existe um agendamento para esta sala neste horário'
                };
            }

            const agendamentoReservaCriado = await this.repository.criar(agendamentoReserva);

            if (!agendamentoReservaCriado) {
                return {
                    erro: 'Erro ao criar agendamento da reserva de sala'
                };
            }

            return {
                dados: agendamentoReservaCriado,
            };
        } catch (error) {
            return {
                erro: 'Erro ao criar agendamento da reserva de sala'
            };
        }
    }

    async buscarPorId(id: number): Promise<{dados?: AgendamentoReserva, erro?: string}> {
        try {
            const agendamentoReserva = await this.repository.buscarPorId(id);
            if (!agendamentoReserva) {
                return {
                    erro: 'Agendamento não encontrado'
                };
            }

            return {
                dados: agendamentoReserva
            };
        } catch (error) {
            return {
                erro: 'Erro ao buscar agendamento'
            };
        }
    }

    async listarTodos(): Promise<{dados?: AgendamentoReserva[], erro?: string}> {
        try {
            const agendamentos = await this.repository.listarTodos();

            return {
                dados: agendamentos
            };
        } catch (error) {
            return {
                erro: 'Erro ao listar agendamentos'
            };
        }
    }

    async listarPorSala(salaId: number): Promise<{dados?: AgendamentoReserva[], erro?: string}> {
        try {
            const sala = await this.salaRepository.buscarPorId(salaId);
            if (!sala) {
                return {
                    erro: 'Sala não encontrada'
                };
            }

            const agendamentos = await this.repository.listarPorSala(salaId);

            return {
                dados: agendamentos
            };
        } catch (error) {
            return {
                erro: 'Erro ao listar agendamentos'
            }
        }
    }

    async listarPorResponsavel(responsavelId: number): Promise<{dados?: AgendamentoReserva[], erro?: string}> {
        try {
            const responsavel = await this.usuarioRepository.buscarPorId(responsavelId);
            if (!responsavel) {
                return {
                    erro: 'Responsável não encontrado'
                };
            }

            const agendamentos = await this.repository.listarPorResponsavel(responsavelId);

            return {
                dados: agendamentos
            };
        } catch (error) {
            return {
                erro: 'Erro ao listar agendamentos'
            }
        }
    }

    async listarPorPeriodo(horarioInicio: Date, horarioFinal: Date): Promise<{dados?: AgendamentoReserva[], erro?: string}> {
        if (!horarioInicio && !horarioFinal) {
            return {
                erro: 'É obrigatório passar pelo menos o horario inicial ou final'
            };
        }

        if (new Date(horarioInicio) >= new Date(horarioFinal)) {
            return {
                erro: 'A data inicial deve ser anterior à data final'
            };
        }

        try {
            const agendamentos = await this.repository.listarPorPeriodo(horarioInicio, horarioFinal);

            return {
                dados: agendamentos
            };
        } catch (error) {
            return {
                erro: 'Erro ao listar agendamentos por periodo'
            }
        }
    }

    async verificarConflito(
        salaId:  number,
        horarioInicio: Date,
        horarioFinal: Date,
        excluirId?: number)
    : Promise<{sucesso?: boolean, erro?: string}> {
        try {
            const sala = await this.salaRepository.buscarPorId(salaId);
            if (!sala) {
                return {
                    erro: 'Sala não encontrada'
                };
            }

            if (new Date(horarioInicio) >= new Date(horarioFinal)) {
                return {
                    erro: 'O horário de início deve ser anterior ao horário final'
                };
            }

            const existeConflito = await this.repository.verificarConflito(salaId, horarioInicio, horarioFinal, excluirId);

            return { sucesso: existeConflito }
        } catch (error) {
            return {
                erro: 'Erro ao verificar conflito entre agendamentos'
            };
        }
    }

    async atualizar(id: number, agendamento: AgendamentoReservaDTO): Promise<{dados?: AgendamentoReserva, erro?: string}> {
        try {
            const agendamentoExistente = await this.repository.buscarPorId(id);
            if (!agendamentoExistente) {
                return {
                    erro: 'Agendamento não encontrado'
                };
            }

            const agora = new Date();
            const horarioFinalExistente = new Date(agendamentoExistente.horario_final);
            if (horarioFinalExistente < agora) {
                return {
                    erro: 'Não é possível editar agendamentos já finalizados'
                };
            }

            if (agendamento.sala_id && agendamento.sala_id !== agendamentoExistente.sala_id) {
                const sala = await this.salaRepository.buscarPorId(agendamento.sala_id);
                if (!sala) {
                    return {
                        erro: 'Sala não encontrada'
                    };
                }
            }

            if (agendamento.responsavel_id && agendamento.responsavel_id !== agendamentoExistente.responsavel_id) {
                const responsavel = await this.usuarioRepository.buscarPorId(agendamento.responsavel_id);
                if (!responsavel) {
                    return {
                        erro: 'Responsável não encontrado'
                    };
                }
            }

            const horarioInicio = agendamento.horario_inicio
                ? new Date(agendamento.horario_inicio)
                : new Date(agendamentoExistente.horario_inicio);

            const horarioFinal = agendamento.horario_final
                ? new Date(agendamento.horario_final)
                : new Date(agendamentoExistente.horario_final);

            if (horarioInicio >= horarioFinal) {
                return {
                    erro: 'O horário de início deve ser anterior ao horário final'
                };
            }

            if (horarioInicio < agora) {
                return {
                    erro: 'Não é possível alterar agendamento para o passado'
                };
            }

            const agendamentoAtualizado = await this.repository.atualizar(id, agendamento);

            if (!agendamentoAtualizado) {
                return {
                    erro: 'Agendamento não encontrado'
                };
            }

            return {
                dados: agendamentoAtualizado
            };
        } catch (error) {
            return {
                erro: 'Erro ao atualizar agendamento'
            }
        }
    }

    async deletar(id: number): Promise<{sucesso?: boolean, erro?: string}> {
        try {
            const agendamentoExistente = await this.repository.buscarPorId(id);
            if (!agendamentoExistente) {
                return {
                    erro: 'Agendamento não encontrado'
                };
            }

            const agora = new Date();
            const horarioFinal = new Date(agendamentoExistente.horario_final);
            if (horarioFinal < agora) {
                return {
                    erro: 'Não é possível deletar agendamentos já finalizados'
                };
            }

            const deletado = await this.repository.deletar(id);

            if (!deletado) {
                return {
                    sucesso: false
                };
            }

            return {
                sucesso: true
            };
        } catch (error) {
            return {
                erro: 'Erro ao deletar agendamento'
            }
        }
    }
}