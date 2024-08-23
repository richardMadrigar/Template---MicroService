import {
  Container, Img, Link, Text,
} from '@react-email/components';

import { CardMain } from './CardMain';

const style = {
  paragraph: {
    color: '#323232',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '4px',
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
};

export const FooterMain = () => (
  <CardMain key="footer" >
    <Container style={{ maxHeight: '160px', width: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Img
          src={'https://react-email-demo-9fn3mchcm-resend.vercel.app/static/stripe-logo.png'}
          width="133"
          height="72"
          alt="Stripe"
          style={{ marginRight: '48px' }}
        />

        <div>
          <Text style={style.paragraph}>
            Agradecemos por utilizar a WhatsPay!
          </Text>
          <Text style={style.paragraph}>
            Se precisar de ajuda, entre em contato com nosso <Link
              style={style.anchor}
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              Suporte
            </Link>.
          </Text>
          <Text style={style.sendAutomatic}>
            Este é um e-mail automático, por favor, não responda.
          </Text>
        </div>
      </div>
    </Container>
  </CardMain>
);
