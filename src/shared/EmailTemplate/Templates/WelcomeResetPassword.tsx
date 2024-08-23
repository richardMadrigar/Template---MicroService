import { Button, Container, Text } from '@react-email/components';

import { styleMain } from '@shared/EmailTemplate/Components/Styles/style';
import { env } from '@shared/Util/Env/Env';

import { TemplateMain } from '../Components/TemplateMain';

const style = {
  paragraphH1: {
    color: '#2F3534',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '24px',
    margin: 0,
    marginBottom: '16px',
    letter: '.2px',
  },
  text: {
    color: '#323232',
    fontSize: '16px',
    lineHeight: '24px',
    margin: 0,
    letter: '.2px',
  },
  sendAutomatic: {
    color: '#323232',
    fontSize: '10px',
    lineHeight: '16px',
    margin: '4px',
  },
  anchor: {
    color: '#556cd6',
  },
  container: {
    margin: '24px 0',
  },
};

export interface IWelcomeResetPassword {
  id: string
}

export const WelcomeResetPassword = ({ id }: IWelcomeResetPassword) => (
  <TemplateMain >
    <Text style={style.paragraphH1}>
      Redefinição de Senha
    </Text>
    <Container style={style.container}>
      <Text style={style.text}>
        Olá,
      </Text>
      <Text style={style.text}>
        Recebemos uma solicitação para redefinir a senha associada à sua conta WhatsPay.
        Sabemos como a segurança da sua conta é importante para você,
        e estamos aqui para ajudar a garantir que suas informações permaneçam protegidas.
      </Text>
    </Container>

    <Container style={style.container}>
      <Text style={style.text}>
        Se você fez essa solicitação, por favor, clique no botão abaixo para redefinir sua senha.
      </Text>
    </Container>

    <Container style={style.container}>
      <Button style={styleMain.button} href={`${env.LINKS.RECOVER_PASSWORD}/${id}`}>
        Redefinir Senha
      </Button>
    </Container>

    <Container style={style.container}>
      <Text style={style.text}>
        Este link é válido por 24 horas.
        Caso não consiga acessar o link ou tenha qualquer dúvida,
        entre em contato com nosso suporte.
      </Text>
    </Container>

    <Container style={{ ...style.container, margin: 0 }}>
      <Text style={style.text}>
        Se você não solicitou a redefinição de senha, por favor, ignore este e-mail.
        Sua senha permanecerá inalterada, e sua conta continuará segura.
      </Text>
    </Container>
  </ TemplateMain >
);
