import { SalaRepository } from "../repositories/sala.repository.ts";
import { type Sala, type SalaDTO } from "../schemas/sala.schema.ts";

export class SalaService {
    private repository: SalaRepository;

    constructor() {
        this.repository = new SalaRepository();
    }

    async criar(sala: SalaDTO): Promise<{dados?: Sala, erro?:string}> {
        try {
            const salaCriada = await this.repository.criar(sala);

            if (!salaCriada) {
                return {
                    erro: 'Erro ao criar sala'
                };
            }

            return {
                dados: salaCriada
            };
        }catch (error) {
            return {
                erro: 'Erro ao criar sala'
            };
        }
    }

    async buscarPorId(id: number): Promise<{dados?: SalaDTO, erro?: string}> {
        try {
            const sala = await this.repository.buscarPorId(id);
            if (!sala) {
                return {
                    erro: 'Sala não encontrada'
                };
            }

            return {
                dados: sala
            };
        } catch (error) {
            return {
                erro: 'Erro ao buscar sala'
            }
        }
    }

    async listarTodas(): Promise<{dados?: Sala[], erro?: string}> {
        try {
            const salas = await this.repository.listarTodas();

            return {
                dados: salas
            };
        } catch (error) {
            return {
                erro: 'Erro ao listar todas as salas'
            };
        }
    }

    async atualizar(id: number, sala: SalaDTO): Promise<{dados?: Sala, erro?: string}> {
        try {
            const salaAtualizada = await this.repository.atualizar(id, sala);

            if (!salaAtualizada) {
                return {
                    erro: 'Sala não encontrada'
                };
            }

            return {
                dados: salaAtualizada
            };
        } catch (error) {
            return {
                erro: 'Erro ao atualizar sala'
            };
        }
    }

    async deletar(id: number): Promise<{sucesso?: boolean, erro?: string}> {
        try {
            const deletada = await this.repository.deletar(id);

            if (!deletada) {
                return {
                    sucesso: false
                };
            }

            return {
                sucesso: true
            }
        } catch (error) {
            return {
                erro: 'Erro ao deletar sala'
            };
        }
    }
}