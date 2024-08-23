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

  LINK_RECOVER_PASSWORD: z.string({ required_error: 'Colocar env LINK_RECOVER_PASSWORD' }),

  AWS_ACCESS_KEY_ID: z.string({ required_error: 'Colocar env AWS_ACCESS_KEY_ID' }),
  AWS_SECRET_ACCESS_KEY: z.string({ required_error: 'Colocar env AWS_SECRET_ACCESS_KEY' }),
  REGION: z.string({ required_error: 'Colocar env REGION' }),

  AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY' }),
  AWS_CONSUMER_QUEUES_DEFAULT_REGION: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_DEFAULT_REGION' }),
  AWS_CONSUMER_QUEUES_ACCESS_KEY_ID: z.string({ required_error: 'Colocar env AWS_CONSUMER_QUEUES_ACCESS_KEY_ID' }),

  QUEUE_SEND_MAIL_SERVICE: z.string({ required_error: 'Colocar env QUEUE_SEND_MAIL_SERVICE' }),
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

  QUEUE_SEND_MAIL_SERVICE: envZod.data.QUEUE_SEND_MAIL_SERVICE,

  LINKS: {
    RECOVER_PASSWORD: envZod.data.LINK_RECOVER_PASSWORD,
  },

  SES_EMAIL: {
    ACCESS_KEY_ID: envZod.data.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: envZod.data.AWS_SECRET_ACCESS_KEY,
    REGION: envZod.data.REGION,
  },

  SQS: {
    ACCESS_KEY_ID: envZod.data.AWS_CONSUMER_QUEUES_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: envZod.data.AWS_CONSUMER_QUEUES_SECRET_ACCESS_KEY,
    REGION: envZod.data.AWS_CONSUMER_QUEUES_DEFAULT_REGION,
  },
};
