const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Rota para criar vaga
app.post('/api/vagas', async (req, res) => {
  const { titulo, descricao, localizacao, tipo } = req.body;

  try {
    const vaga = await prisma.vaga.create({
      data: { titulo, descricao, localizacao, tipo },
    });
    res.status(201).json(vaga);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar vagas
app.get('/api/vagas', async (req, res) => {
  try {
    const vagas = await prisma.vaga.findMany();
    res.json(vagas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
