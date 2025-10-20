import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { type Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AgendaSalas APIs',
            description: 'API para gerenciamento de usuários, salas e agendamentos de reservas',
            version: '1.0.0'
        },
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    required: ['nome', 'email'],
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'Id do usuário',
                            example: 1
                        },
                        nome: {
                            type: 'string',
                            minLength: 1,
                            description: 'Nome do usuário',
                            example: 'João Silva'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário',
                            example: 'joao.silva@exemplo.com'
                        }
                    }
                },
                UsuarioDTO: {
                    type: 'object',
                    required: ['nome', 'email'],
                    properties: {
                        nome: {
                            type: 'string',
                            minLength: 1,
                            description: 'Nome do usuário',
                            example: 'João Silva'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário',
                            example: 'joao.silva@exemplo.com'
                        }
                    }
                },
                Sala: {
                    type: 'object',
                    required: ['sigla', 'nome', 'local', 'capacidade'],
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'Id da sala',
                            example: 1
                        },
                        sigla: {
                            type: 'string',
                            description: 'Sigla da sala',
                            example: 'S101'
                        },
                        nome: {
                            type: 'string',
                            minLength: 1,
                            description: 'Nome da sala',
                            example: 'Sala de Reuniões 1'
                        },
                        local: {
                            type: 'string',
                            minLength: 1,
                            description: 'Localização da sala',
                            example: 'Prédio A - 1º Andar'
                        },
                        capacidade: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Capacidade de pessoas',
                            example: 10
                        }
                    }
                },
                SalaDTO: {
                    type: 'object',
                    required: ['sigla', 'nome', 'local', 'capacidade'],
                    properties: {
                        sigla: {
                            type: 'string',
                            description: 'Sigla da sala',
                            example: 'S101'
                        },
                        nome: {
                            type: 'string',
                            minLength: 1,
                            description: 'Nome da sala',
                            example: 'Sala de Reuniões 1'
                        },
                        local: {
                            type: 'string',
                            minLength: 1,
                            description: 'Localização da sala',
                            example: 'Prédio A - 1º Andar'
                        },
                        capacidade: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Capacidade de pessoas',
                            example: 10
                        }
                    }
                },
                AgendamentoReserva: {
                    type: 'object',
                    required: ['sala_id', 'responsavel_id', 'horario_inicio', 'horario_final', 'titulo'],
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'Id do agendamento',
                            example: 1
                        },
                        sala_id: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Id da sala',
                            example: 1
                        },
                        responsavel_id: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Id do responsável',
                            example: 1
                        },
                        horario_inicio: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Horário de início',
                            example: '2025-10-20T09:00:00Z'
                        },
                        horario_final: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Horário final',
                            example: '2025-10-20T10:00:00Z'
                        },
                        titulo: {
                            type: 'string',
                            minLength: 1,
                            description: 'Título do agendamento',
                            example: 'Reunião de Planejamento'
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição do agendamento',
                            example: 'Discussão sobre o projeto Q4'
                        }
                    }
                },
                AgendamentoReservaDTO: {
                    type: 'object',
                    required: ['sala_id', 'responsavel_id', 'horario_inicio', 'horario_final', 'titulo'],
                    properties: {
                        sala_id: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Id da sala',
                            example: 1
                        },
                        responsavel_id: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Id do responsável',
                            example: 1
                        },
                        horario_inicio: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Horário de início',
                            example: '2025-10-20T09:00:00Z'
                        },
                        horario_final: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Horário final',
                            example: '2025-10-20T10:00:00Z'
                        },
                        titulo: {
                            type: 'string',
                            minLength: 1,
                            description: 'Título do agendamento',
                            example: 'Reunião de Planejamento'
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição do agendamento',
                            example: 'Discussão sobre o projeto Q4'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Mensagem de erro',
                            example: 'Recurso não encontrado'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: 'Agenda Salas Swagger'
    }));

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

export default swaggerSpec;