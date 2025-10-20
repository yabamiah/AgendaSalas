import { UsuarioRepository } from "../repositories/usuario.repository.ts";
import { type Usuario, type UsuarioDTO } from "../schemas/usuario.schema.ts";

export class UsuarioService {
    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    async criar(usuario: UsuarioDTO): Promise<{dados?:Usuario, erro?: string}> {
        try {
            const usuarioCriado = await this.repository.criar(usuario);

            if (!usuarioCriado) {
                return {
                    erro: 'Erro ao criar usuário'
                }
            }

            return {
                dados: usuarioCriado
            }
        } catch (error) {
            return {
                erro: 'Erro ao criar usuário'
            }
        }
    }

    async buscarPorId(id: number): Promise<{dados?: Usuario, erro?: string}> {
        try {
            const usuario = await this.repository.buscarPorId(id);
            if (!usuario) {
                return {
                    erro: 'Usuário não encontrado'
                }
            }

            return {
                dados: usuario
            }
        } catch (error) {
            return {
                erro: 'Erro ao buscar usuário'
            }
        }
    }

    async listarTodos(): Promise<{dados?: Usuario[], erro?: string}> {
        try {
            const usuarios = await this.repository.listarTodos();
            return {
                dados: usuarios
            };

        } catch (error) {
            return {
                erro: 'Erro ao listar todos os usuários'
            };
        }
    }

    async atualizar(id: number, usuario: UsuarioDTO): Promise<{dados?: Usuario, erro?: string}> {
        try {
            const usuarioAtualizado = await this.repository.atualizar(id, usuario);

            if (!usuarioAtualizado) {
                return {
                    erro: 'Usuario não encontrado'
                };
            }

            return {
                dados: usuarioAtualizado
            };
        } catch (error) {
            return {
                erro: 'Erro ao atualizar usuário'
            }
        }
    }

    async deletar(id: number): Promise<{sucesso?: boolean, erro?: string}> {
        try {
            const deletado = await this.repository.deletar(id);

            if(!deletado) {
                return {
                    erro: 'Usuario não encontrado'
                };
            }

            return {
                sucesso: true
            }
        } catch (error) {
            return {
                erro: 'Erro ao deletar usuário'
            }
        }
    }
}