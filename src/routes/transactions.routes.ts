import { Router } from 'express';
import { getRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

import Transaction from '../models/Transaction';

const transactionRepository = new TransactionsRepository();

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transaction = getRepository(Transaction);

  const transactions = await transaction.find();
  const balance = await transactionRepository.getBalance(transactions);

  response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type /* category */ } = request.body;

  const transactionService = new CreateTransactionService();

  const transaction = await transactionService.execute({ title, value, type });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
