import express from "express";
import tareasRoutes from "./routes/TareasRoutes.js";
import cors from "cors";
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.use('/api',tareasRoutes);

export default app;