import * as z from 'zod';

export const AgendamentoReservaDTOSchema = z.object({
    sala_id: z.number().positive(),
    responsavel_id: z.number().positive(),
    horario_inicio: z.iso.datetime(),
    horario_final: z.iso.datetime(),
    titulo: z.string().min(1),
    descricao: z.string().optional()
});

export const AgendamentoReservaSchema = AgendamentoReservaDTOSchema.extend({
    id: z.bigint().positive()
});

export type AgendamentoReservaDTO = z.infer<typeof AgendamentoReservaDTOSchema>;
export type AgendamentoReserva = z.infer<typeof  AgendamentoReservaSchema>