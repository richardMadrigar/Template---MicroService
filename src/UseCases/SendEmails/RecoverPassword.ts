import { IRepositorySendEmail } from 'Repositories/SendEmail/RepositorySendEmail';
import { inject, injectable } from 'tsyringe';

import { IQueueGet } from '@shared/Providers/Queues/ReceiveQueues/DTO/IQueueReceive';
import { AppError } from '@shared/Util/AppError/AppError';

interface IRecoverPassword{
  // idUser: string;
  // name: string;
  // email: string;
  subject: 'RECOVER_PASSWORD';
  receiptHandle: string
}

@injectable()
export class RecoverPassword {
  constructor(
    @inject('RepositorySendEmail') private RepositorySendEmail: IRepositorySendEmail,
    @inject('QueueGet') private QueueGet: IQueueGet,
  ) {}

  async execute({
    subject, receiptHandle,
  }: IRecoverPassword) {
    try {
      // this.RepositorySendEmail
      //   .Create({
      //     name,
      //     email,
      //     idUser,
      //     subject,
      //     idRecoverPassword: '',
      //     id: handleGenerateUuid(),
      //     status: 'success',
      //   });
      // eslint-disable-next-line no-console
      console.log(subject);
      console.log(receiptHandle);
      // se processou tudo que precisa então remover da fila
      // await this.QueueGet.Delete(receiptHandle);
    } catch (error: any) {
      throw new AppError(error);
    }
  }
}
