import { type Request, type Response } from 'express'
import { UsuarioService } from "../services/usuario.service.ts";
import { UsuarioDTOSchema } from "../schemas/usuario.schema.ts";
import * as z from 'zod';

const usuarioService = new UsuarioService();

export class UsuarioController {
    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const usarioDTO = UsuarioDTOSchema.parse(req.body);

            const resultado = await usuarioService.criar(usarioDTO);
            if (resultado.dados) {
                return res.status(201).json({
                    mensagem: 'Usuário criado',
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

            const resultado = await usuarioService.buscarPorId(id);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            })
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }

    async listarTodos(req: Request, res: Response): Promise<Response> {
        try {
            const resultado = await usuarioService.listarTodos();

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            })
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

            const resultado = await usuarioService.atualizar(id, req.body);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
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

            const resultado = await usuarioService.deletar(id);

            if (resultado.sucesso) {
                return res.status(200).json({
                    mensagem: 'Usuário deletado'
                });
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro interno do servidor'
            });
        }
    }
}