import * as vagasService from "../services/vagasService.js";

const parseNumberBR = (val) => {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "number") return val;
  const normalized = String(val)
    .replace(/[^\d,.-]/g, "")            
    .replace(/\.(?=\d{3}(?:\D|$))/g, "") 
    .replace(",", ".");                  
  const n = Number(normalized);
  if (Number.isNaN(n)) throw new Error("Salário inválido");
  return n;
};

export const createVaga = async (req, res) => {
  try {
    // ignorar id/createdAt/updatedAt vindos do front
    const { id, createdAt, updatedAt, ...data } = req.body || {};
    if (data.salary !== undefined) data.salary = parseNumberBR(data.salary);

    const vaga = await vagasService.createVaga(data);
    res.status(201).json(vaga);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllVagas = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query._page || req.query.page || "1", 10), 1);
    const limitRaw = parseInt(req.query._limit || req.query.limit || "10", 10);
    const limit = Math.min(Math.max(limitRaw, 1), 100); 

    const { items } = await vagasService.getAllVagas({ page, limit });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVagaById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "ID inválido" });

    const vaga = await vagasService.getVagaById(id);
    if (!vaga) return res.status(404).json({ message: "Vaga não encontrada" });
    res.json(vaga);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVaga = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "ID inválido" });

    const { id: _ignore, createdAt, updatedAt, ...data } = req.body || {};
    if (data.salary !== undefined) data.salary = parseNumberBR(data.salary);

    const vaga = await vagasService.updateVaga(id, data);
    res.json(vaga);
  } catch (error) {
    const status = String(error.code) === "P2025" ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
};

export const deleteVaga = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "ID inválido" });

    await vagasService.deleteVaga(id);
    res.status(204).end();
  } catch (error) {
    const status = String(error.code) === "P2025" ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
};

