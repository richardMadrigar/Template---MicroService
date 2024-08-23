import { prisma } from '@config/DataBase/Prisma/Index';

import { ICreateUserDTO, IRepositorySendEmail } from '../RepositorySendEmail';

export class RepositorySendEmail implements IRepositorySendEmail {
  async Create({
    email, id, name, idRecoverPassword, idUser, status, subject,
  }: ICreateUserDTO.Params) {
    await prisma.sendEmail.create({
      data: {
        id,
        name,
        email,
        idUser,
        status,
        subject,
        idRecoverPassword,
      },
    });
  }
}
