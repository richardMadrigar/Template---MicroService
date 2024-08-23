import { IMethodEmail } from '@config/NodeMailer/NodeMailerConfig';
import { IRepositorySendEmail } from 'Repositories/SendEmail/RepositorySendEmail';
import { inject, injectable } from 'tsyringe';

import { configsSendEmails } from '@shared/EmailTemplate/ConfigSubjects';
import { handleGenerateUuid } from '@shared/features/handleGenerateUuid/handleGenerateUuid';
import { AppError } from '@shared/Util/AppError/AppError';

interface IRecoverPassword{
  idRecoverPassword: string;
  idUser: string;
  name: string;
  email: string;
  subject: 'RECOVER_PASSWORD';
}

@injectable()
export class RecoverPassword {
  constructor(
    @inject('MethodEmail') private MethodEmail: IMethodEmail,
    @inject('RepositorySendEmail') private RepositorySendEmail: IRepositorySendEmail,
  ) {}

  async execute({
    email, idRecoverPassword, idUser, name, subject,
  }: IRecoverPassword) {
    try {
      const resultTemplate = configsSendEmails[subject];

      const resultSendEmail = await this.MethodEmail
        .sendEmail({
          content: resultTemplate.template({ id: idRecoverPassword }),
          subject: resultTemplate.subject,
          to: [email],
        });

      this.RepositorySendEmail
        .Create({
          name,
          email,
          idUser,
          subject,
          idRecoverPassword,
          id: handleGenerateUuid(),
          status: resultSendEmail.status,
        });
    } catch (error: any) {
      throw new AppError(error);
    }
  }
}
