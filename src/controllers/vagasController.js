import * as vagasService from "../services/vagasService.js";

export const createVaga = async (req, res) => {
  try {
    const vaga = await vagasService.createVaga(req.body);
    res.status(201).json(vaga);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllVagas = async (req, res) => {
  try {
    const vagas = await vagasService.getAllVagas();
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVagaById = async (req, res) => {
  try {
    const vaga = await vagasService.getVagaById(parseInt(req.params.id));
    if (!vaga) return res.status(404).json({ message: "Vaga não encontrada" });
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVaga = async (req, res) => {
  try {
    const vaga = await vagasService.updateVaga(parseInt(req.params.id), req.body);
    res.json(vaga);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVaga = async (req, res) => {
  try {
    await vagasService.deleteVaga(parseInt(req.params.id));
    res.json({ message: "Vaga excluída com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Recebe a requisição do cliente (HTTP), chama o Service apropriado e envia a resposta.