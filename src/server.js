import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import vagasRoutes from "./routes/vagasRoutes.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/vagas", vagasRoutes);

// Checar de está rodando
app.get("/", (req, res) => {
  res.send("API de Vagas funcionando 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Ponto de entrada do servidor.
// Configura e inicializa o servidor Express. <--
