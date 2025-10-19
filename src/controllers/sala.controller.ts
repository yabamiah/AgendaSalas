import { type Request, type Response } from "express";
import { SalaService } from "../services/sala.service.ts";
import {SalaDTOSchema} from "../schemas/sala.schema.ts";
import * as z from 'zod';

const salaService = new SalaService();

export class SalaController {
    async criar(req: Request, res: Response): Promise<Response> {
        try {
            const salaDTO = SalaDTOSchema.parse(req.body);

            const resultado = await salaService.criar(salaDTO);

            if (resultado.dados) {
                return res.status(200).json({
                    mensagem: 'Sala criada',
                    dados: resultado.dados,
                });
            }

            return res.status(404).json({
                error: resultado.erro
            });
        } catch (error) {
            if(error instanceof z.ZodError)  {
                return res.status(400).json({
                    error: error.message
                })
            }

            return res.status(500).send({
                error: 'Erro inteno do servidor'
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

            const resultado = await salaService.buscarPorId(id);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados);
            }

            return res.status(404).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).send({
                error: 'Erro inteno do servidor'
            });
        }
    }

    async listarTodas(req: Request, res: Response): Promise<Response> {
        try {
            const resultado = await salaService.listarTodas();

            if (resultado.dados) {
                return res.status(200).json(resultado.dados)
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).send({
                error: 'Erro inteno do servidor'
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

            const resultado = await salaService.atualizar(id, req.body);

            if (resultado.dados) {
                return res.status(200).json(resultado.dados)
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).send({
                error: 'Erro inteno do servidor'
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

            const resultado = await salaService.deletar(id);

            if (resultado.sucesso) {
                return res.status(200).json({
                    mensagem: 'Sala deletada',
                });
            }

            return res.status(400).json({
                erro: resultado.erro
            });
        } catch (error) {
            return res.status(500).send({
                error: 'Erro inteno do servidor'
            });
        }
    }
}