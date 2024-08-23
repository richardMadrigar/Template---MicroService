import { container } from 'tsyringe';

import { QueueReceiveEmails } from '@shared/Providers/Queues/ReceiveQueuesEmails/QueueReceiveEmails';

import { RecoverPassword } from './SendEmails/RecoverPassword';

export class SQSAll {
  private async execute() {
    const resultQueues = await container.resolve(QueueReceiveEmails).execute();

    const promises = resultQueues.map((element) => {
      if (element?.email) {
        if (element.subject === 'RECOVER_PASSWORD') {
          return container.resolve(RecoverPassword)
            .execute({
              email: element.email,
              idRecoverPassword: element.idRecoverPassword,
              idUser: element.idUser,
              name: element.name,
              subject: element.subject,
            });
        }

      // if ( element.subject === 'RECOVER_PASSWORD') {
      //   return container.resolve(RecoverPassword)
      //     .execute({
      //       email: element.email,
      //       idRecoverPassword: element.idRecoverPassword,
      //       idUser: element.idUser,
      //       name: element.name,
      //       subject: element.subject,
      //     });
      // }
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
