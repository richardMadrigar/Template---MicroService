import AWS from 'aws-sdk';

import { logger } from '@shared/Util/configLogger';
import { env } from '@shared/Util/Env/Env';

export const AWS_SQS = new AWS.SQS({
  region: env.SQS.REGION,
  credentials: {
    accessKeyId: env.SQS.ACCESS_KEY_ID,
    secretAccessKey: env.SQS.SECRET_ACCESS_KEY,
  },
});

AWS_SQS.listQueues({}, (err) => {
  if (err) {
    logger.fatal('Erro ao conectar com a AWS no serviço de SQS:', err);
  } else {
    logger.info('Success connected QUEUES');
  }
});
