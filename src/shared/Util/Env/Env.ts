import { config } from 'dotenv';
import { z } from 'zod';

import { logger } from '../configLogger';

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env' });
} else {
  config();
}

const envSchema = z.object({
  PORT: z.string().default('3001'),

  NODE_ENV: z.enum(['DEVELOP', 'PRODUCTION', 'LOCAL', 'test']),

  DATABASE_URL: z.string({ required_error: 'Colocar env DATABASE_URL' }),

  AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY' }),
  AWS_CONSUMER_QUEUES_DEFAULT_REGION: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_DEFAULT_REGION' }),
  AWS_CONSUMER_QUEUES_ACCESS_KEY_ID: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_ACCESS_KEY_ID' }),

  QUEUE_GET: z.string({ required_error: 'Colocar env QUEUE_GET' }),
});

const envZod = envSchema.safeParse(process.env);

if (envZod.success === false) {
  logger.fatal(envZod.error.format());
  throw new Error('🛑 Invalid environment variables !');
}

export const env = {
  PORT: envZod.data.PORT,
  NODE_ENV: envZod.data.NODE_ENV,
  DATABASE_URL: envZod.data.DATABASE_URL,

  QUEUE_GET: envZod.data.QUEUE_GET,

  SQS: {
    ACCESS_KEY_ID: envZod.data.AWS_CONSUMER_QUEUES_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: envZod.data.AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY,
    REGION: envZod.data.AWS_CONSUMER_QUEUES_DEFAULT_REGION,
  },
};
