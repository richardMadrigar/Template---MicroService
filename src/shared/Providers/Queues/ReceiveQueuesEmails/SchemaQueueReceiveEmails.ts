import { z } from 'zod';

export const SchemaQueueGetEmails = z
  .object({
    email: z
      .string({
        required_error: 'Send field email',
        invalid_type_error: 'Send field email string',
      })
      .trim()
      .email({ message: 'Email com formato invalido' }),

    name: z
      .string({
        invalid_type_error: 'Send field name string',
      })
      .trim(),

    subject: z.enum(['RECOVER_PASSWORD']),

    idUser: z
      .string({
        required_error: 'Send field idUser',
        invalid_type_error: 'Send field idUser string',
      })
      .trim()
      .optional(),

    idRecoverPassword: z
      .string({
        invalid_type_error: 'Send field idRecoverPassword string',
      })
      .trim()
      .optional(),
  })
  .superRefine(({ subject, idRecoverPassword, name }, ctx) => {
    if (subject === 'RECOVER_PASSWORD') {
      if (!idRecoverPassword) ctx.addIssue({ code: 'custom', message: 'Send field idRecoverPassword string' });
      if (!name) ctx.addIssue({ code: 'custom', message: 'Send field name string' });
    }
  });
