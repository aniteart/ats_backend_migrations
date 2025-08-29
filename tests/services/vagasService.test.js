import { jest } from '@jest/globals';

// Mock prisma
const vagaMock = {
  create: jest.fn(),
  findMany: jest.fn(),
  count: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const PrismaClientMock = jest.fn().mockImplementation(() => ({
  vaga: vagaMock
}));

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: PrismaClientMock
}));

const service = await import('../../src/services/vagasService.js');

beforeEach(() => {
  jest.clearAllMocks();
});

test('createVaga chama prisma.vaga.create com data', async () => {
  vagaMock.create.mockResolvedValue({ id: 1, title: 'Dev' });
  const out = await service.createVaga({ title: 'Dev' });
  expect(vagaMock.create).toHaveBeenCalledWith({ data: { title: 'Dev' } });
  expect(out).toEqual({ id: 1, title: 'Dev' });
});

test('getAllVagas pagina corretamente e retorna items+total', async () => {
  vagaMock.findMany.mockResolvedValue([{ id: 2 }, { id: 1 }]);
  vagaMock.count.mockResolvedValue(7);

  const { items, total } = await service.getAllVagas({ page: 2, limit: 2 });
  expect(vagaMock.findMany).toHaveBeenCalledWith({
    skip: 2,
    take: 2,
    orderBy: { createdAt: 'desc' }
  });
  expect(items).toHaveLength(2);
  expect(total).toBe(7);
});

test('getVagaById delega para prisma.vaga.findUnique', async () => {
  vagaMock.findUnique.mockResolvedValue({ id: 10 });
  const out = await service.getVagaById(10);
  expect(vagaMock.findUnique).toHaveBeenCalledWith({ where: { id: 10 } });
  expect(out).toEqual({ id: 10 });
});

test('updateVaga delega para prisma.vaga.update', async () => {
  vagaMock.update.mockResolvedValue({ id: 10, title: 'X' });
  const out = await service.updateVaga(10, { title: 'X' });
  expect(vagaMock.update).toHaveBeenCalledWith({ where: { id: 10 }, data: { title: 'X' } });
  expect(out).toEqual({ id: 10, title: 'X' });
});

test('deleteVaga delega para prisma.vaga.delete', async () => {
  vagaMock.delete.mockResolvedValue({ id: 3 });
  await service.deleteVaga(3);
  expect(vagaMock.delete).toHaveBeenCalledWith({ where: { id: 3 } });
});

// Service (vagasService): 
// Garantir que a camada de negócio chama o Prisma corretamente (método certo, parâmetros certos) e implementa paginação/CRUD.