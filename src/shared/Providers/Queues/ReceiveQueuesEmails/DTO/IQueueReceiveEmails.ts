import { z } from 'zod';

import { SchemaQueueGetEmails } from '../SchemaQueueReceiveEmails';

export type SchemaIQueueGetEmails = z.output<typeof SchemaQueueGetEmails>;

export namespace IQueueReceiveEmailsDTO {
  export type Params = SchemaIQueueGetEmails;
}
export namespace IQueueReceiveEmailsExecute {
  export type Result = {
    name: string
    email: string
    idUser: string
    subject: 'RECOVER_PASSWORD'
    idRecoverPassword: string
  };
}

export interface IQueueReceiveEmails {
  execute(): Promise<IQueueReceiveEmailsExecute.Result[]>;
}
