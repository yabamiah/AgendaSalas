import postgres from 'postgres';

const conn = postgres(process.env.DATABASE_URL!, {
    max: 10,
    idle_timeout: 10000,
    connect_timeout: 10000,
});

export default conn;