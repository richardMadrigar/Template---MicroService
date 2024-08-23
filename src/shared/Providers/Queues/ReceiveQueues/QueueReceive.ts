import { inject, injectable } from 'tsyringe';

import { env } from '@shared/Util/Env/Env';

import { ISQSService } from '../ISQSConfig';
import { IQueueGetExecute, IQueueGet } from './DTO/IQueueReceive';

@injectable()
export class QueueGet implements IQueueGet {
  private queueUrl: string;

  constructor(@inject('SQSService') private SQSService: ISQSService) {
    this.queueUrl = env.QUEUE_GET;
  }

  async execute() {
    const resultQueue = await this.SQSService
      .ReceiveMessages(this.queueUrl) as IQueueGetExecute.Result[];
    console.log(resultQueue);
    return resultQueue;
  }

  async Delete(receiptHandle: string) {
    await this.SQSService.DeleteMessage(this.queueUrl, receiptHandle);
  }
}
