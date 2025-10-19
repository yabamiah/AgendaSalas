import * as z from "zod";

export const UsuarioDTOSchema = z.object({
    nome: z.string().min(1),
    email: z.email()
});

export const UsuarioSchema = UsuarioDTOSchema.extend({
    id: z.bigint().positive()
});

export type UsuarioDTO = z.infer<typeof UsuarioDTOSchema>;
export type Usuario = z.infer<typeof UsuarioSchema>;