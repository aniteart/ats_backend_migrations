import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createVaga = async (data) => {
  return prisma.vaga.create({ data });
};

export const getAllVagas = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.vaga.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, 
    }),
    prisma.vaga.count(),
  ]);

  return { items, total };
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

