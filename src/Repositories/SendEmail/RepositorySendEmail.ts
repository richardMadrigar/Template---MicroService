import { SendEmail } from '@prisma/client';

export namespace ICreateUserDTO {
  export type Params = Omit<SendEmail, 'password' | 'createdAt' | 'updatedAt'>;
}

export interface IRepositorySendEmail {
  Create(data: ICreateUserDTO.Params): Promise<void>;
}
