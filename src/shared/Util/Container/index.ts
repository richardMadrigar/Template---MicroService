import { RepositorySendEmail } from 'Repositories/SendEmail/Postgres/RepositorySendEmail';
import { container } from 'tsyringe';

import { QueueGet } from '@shared/Providers/Queues/ReceiveQueues/QueueReceive';
import { SQSService } from '@shared/Providers/Queues/SQSService';

container.registerSingleton<RepositorySendEmail>(
  'RepositorySendEmail',
  RepositorySendEmail,
);

container.registerSingleton<SQSService>(
  'SQSService',
  SQSService,
);

container.registerSingleton<QueueGet>(
  'QueueGet',
  QueueGet,
);
