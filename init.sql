-- CRIANDO A TABELA DE AGENDAMENTO_RESERVA --
CREATE TABLE "agendamento_reserva"(
                                      "id" bigserial NOT NULL,
                                      "sala_id" BIGINT NOT NULL,
                                      "responsavel_id" BIGINT NOT NULL,
                                      "horario_inicio" TIMESTAMP(0) WITH TIME ZONE NOT NULL,
                                      "horario_final" TIMESTAMP(0) WITH TIME ZONE NOT NULL,
                                      "titulo" VARCHAR(50) NOT NULL,
                                      "descricao" TEXT NULL
);
ALTER TABLE
    "agendamento_reserva" ADD PRIMARY KEY("id");

-- CRIANDO A TABELA DE USUARIO --
CREATE TABLE "usuario"(
                          "id" bigserial NOT NULL,
                          "nome" VARCHAR(255) NOT NULL,
                          "email" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "usuario" ADD PRIMARY KEY("id");
ALTER TABLE
    "usuario" ADD CONSTRAINT "usuario_email_unique" UNIQUE("email");

-- CRIANDO A TABELA DE SALA --
CREATE TABLE "sala"(
                       "id" bigserial NOT NULL,
                       "sigla" VARCHAR(20) NOT NULL,
                       "nome" VARCHAR(255) NOT NULL,
                       "local" VARCHAR(255) NOT NULL,
                       "capacidade" BIGINT NOT NULL
);
ALTER TABLE
    "sala" ADD PRIMARY KEY("id");
ALTER TABLE
    "sala" ADD CONSTRAINT "sala_sigla_unique" UNIQUE("sigla");
ALTER TABLE
    "agendamento_reserva" ADD CONSTRAINT "agendamento_reserva_responsavel_id_foreign" FOREIGN KEY("responsavel_id") REFERENCES "usuario"("id");
ALTER TABLE
    "agendamento_reserva" ADD CONSTRAINT "agendamento_reserva_sala_id_foreign" FOREIGN KEY("sala_id") REFERENCES "sala"("id");


-- 1. INSERIR USUÁRIOS (responsáveis) --
INSERT INTO "usuario" (nome, email) VALUES
                                        ('Ana Silva', 'ana.silva@exemplo.com'),
                                        ('Bruno Costa', 'bruno.costa@exemplo.com'),
                                        ('Carla Dias', 'carla.dias@exemplo.com');


-- 2. INSERIR SALAS --
INSERT INTO "sala" (sigla, nome, local, capacidade) VALUES
                                                        ('A-101', 'Sala de Reuniões Principal', 'Bloco A, 1º Andar', 20),
                                                        ('B-205', 'Auditório Pequeno', 'Bloco B, 2º Andar', 50),
                                                        ('C-LAB', 'Laboratório de Inovação', 'Bloco C, Térreo', 12);


-- 3. INSERIR AGENDAMENTOS (referenciando IDs de usuários e salas) --
INSERT INTO "agendamento_reserva" (sala_id, responsavel_id, horario_inicio, horario_final, titulo, descricao) VALUES
(1, 1, '2025-10-21T09:00:00.0000Z', '2025-10-21T10:30:00.0000Z', 'Reunião Kick-off Projeto X', 'Alinhamento inicial da equipe.'),
(1, 2, '2025-10-21T14:00:00.0000Z', '2025-10-21T16:00:0.0000Z', 'Entrevista Candidato Y', NULL),

-- Um agendamento na Sala 2 (ID=2)
(2, 3, '2025-10-22T10:00:00.0000Z', '2025-10-22 11:00:0.0000Z', 'Apresentação de Resultados', 'Resultados do Q3.');