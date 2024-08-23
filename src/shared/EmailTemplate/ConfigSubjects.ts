import { WelcomeResetPassword } from './Templates/WelcomeResetPassword';

export const configsSendEmails = {
  RECOVER_PASSWORD: {
    subject: 'Whats Pay - Redefinição de senha',
    template: WelcomeResetPassword,
  },
  CREATE_ACCOUNT: {
    subject: 'Whats Pay - criação de senha',
    template: WelcomeResetPassword,
  },
};
