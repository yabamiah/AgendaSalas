import express, { type Express } from "express";
import morgan from 'morgan';
import usuarioRoute from "./src/routes/usuario.route.ts";
import salaRoute from "./src/routes/sala.route.ts";
import agendamentoReservaRoute from "./src/routes/agendamentoReserva.route.ts";
import { setupSwagger } from './src/config/swagger.ts'

const app: Express = express();

app.use(express.json());
app.use(morgan('tiny'));

setupSwagger(app);

app.use('/api/usuario', usuarioRoute);
app.use('/api/sala', salaRoute)
app.use('/api/agendamento-reserva', agendamentoReservaRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server está executando em http://localhost:${PORT}`);
});

export default app;