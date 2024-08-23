import 'reflect-metadata';
import './shared/Util/Container/index';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import { AppError } from '@shared/Util/AppError/AppError';
import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/Env/Env';

import { SQSTimeOut } from './UseCases/indexQueues';

SQSTimeOut.then();

export const app = express();

if (env.NODE_ENV === 'PRODUCTION') {
  process.on('uncaughtException', (error) => logger.error(error));
}

app.use(
  async (err: Error, request: Request, response: Response, next: NextFunction) => {
    logger.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    response.status(500).json({ message: 'Erro desconhecido!' });
    return next();
  },
);
