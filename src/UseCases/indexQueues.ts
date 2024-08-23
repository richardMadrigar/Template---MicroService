import { container } from 'tsyringe';

import { QueueGet } from '@shared/Providers/Queues/ReceiveQueues/QueueReceive';

import { RecoverPassword } from './SendEmails/RecoverPassword';

export class SQSAll {
  private async execute() {
    const serviceQueues = container.resolve(QueueGet);

    const resultQueues = await serviceQueues.execute();
    console.log('resultado da fila', resultQueues);

    const promises = resultQueues.map((element) => {
      if (element.body) {
        console.log('resultado que existe body', element);
        container.resolve(RecoverPassword)
          .execute({
            subject: 'RECOVER_PASSWORD',
            receiptHandle: element.receiptHandle,
          });

        return null;
      }

      return null;
    });

    await Promise.all(promises);
  }

  async TimeOut() {
    setInterval(() => {
      this.execute().then();
    }, 5000);
  }
}

export const SQSTimeOut = new SQSAll().TimeOut().then();
