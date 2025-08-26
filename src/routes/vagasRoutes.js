import { Router } from "express";
import * as vagasController from "../controllers/vagasController.js";

const router = Router();

router.post("/", vagasController.createVaga);
router.get("/", vagasController.getAllVagas);
router.get("/:id", vagasController.getVagaById);
router.put("/:id", vagasController.updateVaga);
router.delete("/:id", vagasController.deleteVaga);

export default router;

// Define os endpoints da API e conecta os controllers.