import { PrismaClient } from '@prisma/client';

import { logger } from '@shared/Util/configLogger';

export const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => logger.info('Success connected DATABASE'))
  .catch(() => logger.fatal('Database not connected'));
