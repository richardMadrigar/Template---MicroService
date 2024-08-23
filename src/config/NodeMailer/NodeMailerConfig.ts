/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import React from 'react';

import { HandleIsValidEmail } from '@shared/features/handleIsValidEmail/handleIsValidEmail';
import { AppError } from '@shared/Util/AppError/AppError';
import { logger } from '@shared/Util/configLogger';

interface IMethodEmailSendEmail {
  to: string[]
  content: React.ReactElement;
  subject: string;
}

// export const transporter = nodemailer.createTransport({ SES: AWS_SES });
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'richardsendemail@gmail.com',
    pass: 'itbsrqyrbulyewtc',
  },
});

transporter.verify((error, success) => {
  if (error) return logger.fatal(`Error connection service Email ${error}`);

  logger.info('Success connected SERVER_EMAIL');
  return success;
});

export interface IMethodEmail {
  sendEmail({ content, subject, to }: IMethodEmailSendEmail): Promise<{
    status: string;
}>
}

export class MethodEmail implements IMethodEmail {
  async sendEmail({ content, subject, to }: IMethodEmailSendEmail) {
    to.forEach((item) => {
      if (!HandleIsValidEmail(item)) throw new AppError(`Email ${item} com formato invalido`);
    });

    try {
      await transporter.sendMail({
        from: 'WhatsPay <no-reply@agenus.com>',
        to,
        subject,
        html: render(content),
      });
      return { status: 'success' };
    } catch (error) {
      throw new AppError(`Falha no envio de email, ${error}`);
    }
  }
}
