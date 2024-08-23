import { MethodEmail } from '@config/NodeMailer/NodeMailerConfig';
import { RepositorySendEmail } from 'Repositories/SendEmail/Postgres/RepositorySendEmail';
import { container } from 'tsyringe';

import { QueueReceiveEmails } from '@shared/Providers/Queues/ReceiveQueuesEmails/QueueReceiveEmails';
import { SQSService } from '@shared/Providers/Queues/SQSService';

container.registerSingleton<RepositorySendEmail>(
  'RepositorySendEmail',
  RepositorySendEmail,
);

container.registerSingleton<SQSService>(
  'SQSService',
  SQSService,
);

container.registerSingleton<QueueReceiveEmails>(
  'QueueReceiveEmails',
  QueueReceiveEmails,
);

container.registerSingleton<MethodEmail>(
  'MethodEmail',
  MethodEmail,
);
