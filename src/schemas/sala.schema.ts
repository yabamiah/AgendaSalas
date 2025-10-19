import * as z from 'zod';

export const SalaDTOSchema= z.object({
    sigla: z.string().nonoptional(),
    nome: z.string().min(1),
    local: z.string().min(1),
    capacidade: z.number().positive(),
});

export const SalaSchema = SalaDTOSchema.extend({
    id: z.bigint().positive()
});

export type SalaDTO = z.infer<typeof SalaDTOSchema>;
export type Sala = z.infer<typeof SalaSchema>;