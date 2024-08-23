import { z } from 'zod';

import { SchemaQueueGet } from '../SchemaQueueReceive';

export type SchemaIQueueGets = z.output<typeof SchemaQueueGet>;

export namespace IQueueGetDTO {
  export type Params = SchemaIQueueGets;
}
export namespace IQueueGetExecute {
  export type Result = {
    body: {
      name: string
      email: string
      idUser: string
      subject: 'RECOVER_PASSWORD'
    }
    receiptHandle: string
  };
}

export interface IQueueGet {
  execute(): Promise<IQueueGetExecute.Result[]>;
  Delete(receiptHandle: string): Promise<void>
}
