import conn from '../config/postgresConnection.ts'
import { type AgendamentoReserva, type AgendamentoReservaDTO } from "../schemas/agendamentoReserva.schema.ts";

export class AgendamentoReservaRepository{
    async criar(agendamento: AgendamentoReservaDTO): Promise<AgendamentoReserva> {
        const [resultado] = await conn`
            INSERT INTO agendamento_reserva (
                sala_id, 
                responsavel_id, 
                horario_inicio, 
                horario_final, 
                titulo, 
                descricao
            )
            VALUES (
                ${agendamento.sala_id},
                ${agendamento.responsavel_id},
                ${agendamento.horario_inicio},
                ${agendamento.horario_final},
                ${agendamento.titulo},
                ${agendamento.descricao || null}
            )
            RETURNING 
                id, 
                sala_id, 
                responsavel_id, 
                horario_inicio, 
                horario_final, 
                titulo, 
                descricao
        `;

        return resultado as AgendamentoReserva;
    }

    async buscarPorId(id: number): Promise<AgendamentoReserva> {
        const [agendamentoReserva] = await conn`
            SELECT * FROM agendamento_reserva
            WHERE id=${id}
        `;

        return agendamentoReserva as AgendamentoReserva;
    }

    async listarTodos(): Promise<AgendamentoReserva[]> {
        const agendamentos = await conn`
            SELECT * FROM agendamento_reserva
            ORDER BY id ASC
        `;

        return [...agendamentos] as AgendamentoReserva[];
    }

    async listarPorSala(salaId: number): Promise<AgendamentoReserva[]> {
        const agendamentos = await conn`
            SELECT * FROM agendamento_reserva
            WHERE sala_id=${salaId}
            ORDER BY sala_id ASC
        `;

        return [...agendamentos] as AgendamentoReserva[];
    }

    async listarPorResponsavel(responsavelId: number): Promise<AgendamentoReserva[]> {
        const agendamentos = await conn`
            SELECT * FROM agendamento_reserva
            WHERE responsavel_id=${responsavelId}
            ORDER BY responsavel_id ASC
        `;

        return [...agendamentos] as AgendamentoReserva[];
    }

    async listarPorPeriodo(horarioInicio: Date, horarioFinal: Date): Promise<AgendamentoReserva[]> {
        const agendamentos = await conn`
            SELECT * FROM agendamento_reserva
            WHERE horario_inicio >= ${horarioInicio}
            AND horario_final <= ${horarioFinal}
            ORDER BY id ASC
        `;

        return [...agendamentos] as AgendamentoReserva[];
    }

    async verificarConflito(
        salaId: number,
        horarioInicio: Date,
        horarioFinal: Date,
        excluirId?: number
    ) : Promise<boolean> {
        let resultado;

        if (excluirId) {
            resultado = await conn`
                SELECT 1 FROM agendamento_reserva
                WHERE sala_id=${salaId}
                AND id != ${excluirId}
                AND (
                    horario_inicio < ${horarioFinal} AND
                    horario_final > ${horarioInicio}
                )
            `;
        } else {
            resultado = await conn`
                SELECT 1 FROM agendamento_reserva
                WHERE sala_id=${salaId}
                AND (
                    horario_inicio < ${horarioFinal} AND
                    horario_final > ${horarioInicio}
                )
            `;
        }

        return resultado.length > 0;
    }

    async atualizar(
        id: number,
        agendamento: Partial<AgendamentoReserva>
    ): Promise<AgendamentoReserva | null> {
        const camposParaAtualizar: any = {};

        if (agendamento.sala_id != null) {
            camposParaAtualizar.sala_id = agendamento.sala_id;
        }

        if (agendamento.responsavel_id != null) {
            camposParaAtualizar.responsavel_id = agendamento.responsavel_id;
        }

        if (agendamento.horario_inicio != null) {
            camposParaAtualizar.horario_inicio = agendamento.horario_inicio;
        }

        if (agendamento.horario_final != null) {
            camposParaAtualizar.horario_final = agendamento.horario_final;
        }

        if (agendamento.titulo != null) {
            camposParaAtualizar.titulo = agendamento.titulo;
        }

        if (agendamento.descricao != null) {
            camposParaAtualizar.descricao = agendamento.descricao;
        }

        if (Object.keys(camposParaAtualizar).length === 0) {
            return this.buscarPorId(id);
        }

        const [resultado] = await conn`
            UPDATE agendamento_reserva 
            SET ${conn(camposParaAtualizar)}
            WHERE id = ${id}
            RETURNING *
        `;

        return resultado as AgendamentoReserva;
    }

    async deletar(id: number) : Promise<boolean> {
        const deletado = await conn`
            DELETE FROM agendamento_reserva
            WHERE id = ${id}
        `;

        return deletado.count > 0;
    }
}