import { jest } from '@jest/globals';
import express from 'express';
import request from 'supertest';

// Mock service
const serviceMock = {
  createVaga: jest.fn(),
  getAllVagas: jest.fn(),
  getVagaById: jest.fn(),
  updateVaga: jest.fn(),
  deleteVaga: jest.fn(),
};

jest.unstable_mockModule('../../src/services/vagasService.js', () => serviceMock);

const controller = await import('../../src/controllers/vagasController.js');

// App teste
function makeApp() {
  const app = express();
  app.use(express.json());

  app.post('/vagas', controller.createVaga);
  app.get('/vagas', controller.getAllVagas);
  app.get('/vagas/:id', controller.getVagaById);
  app.put('/vagas/:id', controller.updateVaga);
  app.delete('/vagas/:id', controller.deleteVaga);

  return app;
}

beforeEach(() => {
  jest.clearAllMocks();
});

test('POST /vagas faz parse do salário BR e retorna 201', async () => {
  serviceMock.createVaga.mockResolvedValue({ id: 1, salary: 1234.56 });

  const app = makeApp();
  const res = await request(app)
    .post('/vagas')
    .send({
      title: 'Dev',
      salary: 'R$ 1.234,56', // BR
    });

  expect(serviceMock.createVaga).toHaveBeenCalledWith({
    title: 'Dev',
    salary: 1234.56
  });
  expect(res.status).toBe(201);
  expect(res.body).toEqual({ id: 1, salary: 1234.56 });
});

test('GET /vagas usa paginação com defaults e retorna itens', async () => {
  serviceMock.getAllVagas.mockResolvedValue({ items: [{ id: 1 }], total: 1 });

  const app = makeApp();
  const res = await request(app).get('/vagas');

  expect(serviceMock.getAllVagas).toHaveBeenCalledWith({ page: 1, limit: 10 });
  expect(res.status).toBe(200);
  expect(res.body).toEqual([{ id: 1 }]); 
});

test('GET /vagas?page=2&limit=5 respeita query params', async () => {
  serviceMock.getAllVagas.mockResolvedValue({ items: [{ id: 5 }], total: 7 });

  const app = makeApp();
  const res = await request(app).get('/vagas?page=2&limit=5');

  expect(serviceMock.getAllVagas).toHaveBeenCalledWith({ page: 2, limit: 5 });
  expect(res.status).toBe(200);
  expect(res.body).toEqual([{ id: 5 }]);
});

test('GET /vagas/:id valida id e retorna 400 se inválido', async () => {
  const app = makeApp();
  const res = await request(app).get('/vagas/abc');
  expect(res.status).toBe(400);
  expect(res.body).toEqual({ error: 'ID inválido' });
});

test('GET /vagas/:id retorna 404 quando não achar', async () => {
  serviceMock.getVagaById.mockResolvedValue(null);

  const app = makeApp();
  const res = await request(app).get('/vagas/999');

  expect(serviceMock.getVagaById).toHaveBeenCalledWith(999);
  expect(res.status).toBe(404);
  expect(res.body).toEqual({ message: 'Vaga não encontrada' });
});

test('PUT /vagas/:id faz parse do salário e retorna vaga', async () => {
  serviceMock.updateVaga.mockResolvedValue({ id: 1, salary: 2000 });

  const app = makeApp();
  const res = await request(app)
    .put('/vagas/1')
    .send({ salary: '2.000,00' });

  expect(serviceMock.updateVaga).toHaveBeenCalledWith(1, { salary: 2000 });
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, salary: 2000 });
});

test('PUT /vagas/:id traduz P2025 em 404', async () => {
  const err = new Error('Not found');
  err.code = 'P2025';
  serviceMock.updateVaga.mockRejectedValue(err);

  const app = makeApp();
  const res = await request(app).put('/vagas/1').send({ title: 'X' });

  expect(res.status).toBe(404);
  expect(res.body).toEqual({ error: 'Not found' });
});

test('DELETE /vagas/:id retorna 204', async () => {
  serviceMock.deleteVaga.mockResolvedValue();

  const app = makeApp();
  const res = await request(app).delete('/vagas/1');

  expect(serviceMock.deleteVaga).toHaveBeenCalledWith(1);
  expect(res.status).toBe(204);
  expect(res.text).toBe('');
});

// Controller (rotas Express): 
// Garantir o contrato HTTP (status codes, body de resposta, parse do salário em formato BR, erros traduzidos p/ 404, etc.).