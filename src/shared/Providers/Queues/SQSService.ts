/* eslint-disable no-restricted-syntax */
import { AWS_SQS } from '@config/AWS/SQS/SQSConfig';
import AWS from 'aws-sdk';
import { ReceiveMessageResult } from 'aws-sdk/clients/sqs';

import { AppError } from '@shared/Util/AppError/AppError';

import { ISQSService, ISQSServiceMessageBody } from './ISQSConfig';

/**
 * @note Esta classe não deve ser usada diretamente.
 * Utilize os serviços de fila específicos.
 */

export class SQSService implements ISQSService {
  private sqs: AWS.SQS;

  constructor() {
    this.sqs = AWS_SQS;
  }

  async ReceiveMessages(queueUrl: string): Promise<ISQSServiceMessageBody[]> {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10, // Define quantas mensagens consumir por vez
      WaitTimeSeconds: 20, // Long polling para melhorar a performance
    };

    try {
      const data: ReceiveMessageResult = await this.sqs.receiveMessage(params).promise();

      const messages: ISQSServiceMessageBody[] = [];

      if (data.Messages) {
        for (const message of data.Messages) {
          if (message.Body) {
            messages.push(JSON.parse(message.Body));
            await this.deleteMessage(queueUrl, message.ReceiptHandle!);
          }
        }
      }

      return messages;
    } catch (error: any) {
      throw new AppError(error);
    }
  }

  private async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };

    try {
      await this.sqs.deleteMessage(params).promise();
    } catch (error: any) {
      throw new AppError(error);
    }
  }
}
