import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createVaga = async (data) => {
  return prisma.vaga.create({ data });
};

export const getAllVagas = async () => {
  return prisma.vaga.findMany();
};

export const getVagaById = async (id) => {
  return prisma.vaga.findUnique({ where: { id } });
};

export const updateVaga = async (id, data) => {
  return prisma.vaga.update({
    where: { id },
    data,
  });
};

export const deleteVaga = async (id) => {
  return prisma.vaga.delete({ where: { id } });
};



// Contém a lógica de negócio, interage com o banco de dados usando Prisma. <---


// createVaga(data)
// getVagas()
// getVagaById(id)
// updateVaga(id, data)
// deleteVaga(id)
