import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({ title, value, type }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const transaction = transactionRepository.create({ title, value, type });

    await transactionRepository.save({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
