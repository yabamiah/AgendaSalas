import conn from '../config/postgresConnection.ts'
import { type Sala, type SalaDTO } from "../schemas/sala.schema.ts";

export class SalaRepository {
    async criar(sala: SalaDTO): Promise<Sala> {
        const [resultado] = await conn`
            INSERT INTO sala (sigla, nome, local, capacidade)
            VALUES (${sala.sigla}, ${sala.nome}, ${sala.local}, ${sala.capacidade})
            RETURNING *
        `;

        return resultado as Sala;
    }

    async buscarPorId(id: number): Promise<Sala> {
        const [sala] = await conn`
            SELECT * FROM sala
            WHERE id=${id}
        `;

        return sala as Sala;
    }

    async listarTodas(): Promise<Sala[]> {
        const salas = await conn`
        SELECT * FROM sala
        ORDER BY id ASC
        `;

        return [...salas] as Sala[];
    }

    async atualizar(id: number, sala: SalaDTO): Promise<Sala> {
        const camposParaAtualizar: any = {};
        if (sala.nome != null) {
            camposParaAtualizar.nome = sala.nome;
        }

        if (sala.sigla != null) {
            camposParaAtualizar.sigla = sala.sigla;
        }

        if(sala.local != null) {
            camposParaAtualizar.local = sala.local;
        }

        if(sala.capacidade != null) {
            camposParaAtualizar.capacidade = sala.capacidade;
        }

        const [resultado] = await conn`
            UPDATE sala
            SET ${conn(camposParaAtualizar)}
            WHERE id=${id}
            RETURNING *
        `;

        return resultado as Sala;
    }

    async deletar(id: number): Promise<boolean> {
        const resultado = await conn`
            DELETE FROM sala
            WHERE id=${id}
        `;

        return resultado.count > 0;
    }
}