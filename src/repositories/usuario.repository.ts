import conn from '../config/postgresConnection.ts'
import { type Usuario, type UsuarioDTO } from '../schemas/usuario.schema.ts'

export class UsuarioRepository {
    async criar(usuario: UsuarioDTO): Promise<Usuario> {
        const [resultado] = await conn`
            INSERT INTO usuario (nome, email)
            VALUES (${usuario.nome}, ${usuario.email})
            RETURNING *
        `;

        return resultado as Usuario;
    }

    async buscarPorId(id: number): Promise<Usuario> {
        const [usuario] = await conn`
            SELECT * FROM usuario
            WHERE id=${id}
        `;

        return usuario as Usuario;
    }

    async listarTodos(): Promise<Usuario[]> {
        const usuarios = await conn`
            SELECT * FROM usuario
            ORDER BY id ASC
        `;

        return [...usuarios] as Usuario[];
    }

    async atualizar(id: number, usuario: Partial<UsuarioDTO>): Promise<Usuario> {
        const camposParaAtualizar: any = {};
        if (usuario.nome != null) {
            camposParaAtualizar.nome = usuario.nome;
        }

        if (usuario.email != null) {
            camposParaAtualizar.email = usuario.email;
        }

        const [resultado] = await conn`
            UPDATE public.usuario
            SET ${conn(camposParaAtualizar)}
            WHERE id=${id}
            RETURNING *;
        `;

        return resultado as Usuario;
    }

    async deletar(id: number): Promise<boolean> {
        const resultado = await conn`
            DELETE FROM usuario
            WHERE id=${id}
        `;

        return resultado.count > 0;
    }
}