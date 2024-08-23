import { inject, injectable } from 'tsyringe';

import { env } from '@shared/Util/Env/Env';

import { ISQSService } from '../ISQSConfig';
import { IQueueReceiveEmailsExecute, IQueueReceiveEmails } from './DTO/IQueueReceiveEmails';

@injectable()
export class QueueReceiveEmails implements IQueueReceiveEmails {
  private queueUrl: string;

  constructor(@inject('SQSService') private SQSService: ISQSService) {
    this.queueUrl = env.QUEUE_SEND_MAIL_SERVICE;
  }

  async execute() {
    const resultQueue = await this.SQSService
      .ReceiveMessages(this.queueUrl) as IQueueReceiveEmailsExecute.Result[];

    return resultQueue;
  }
}
