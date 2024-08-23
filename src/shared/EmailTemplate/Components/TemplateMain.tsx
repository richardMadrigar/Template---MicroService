import {
  Body,
  Container,
  Head,
  Html,
} from '@react-email/components';
import React from 'react';

import { BaseboardMain } from './BaseboardMain';
import { ContentCore } from './ContentMain';
import { FooterMain } from './FooterMain';
import { HeaderMain } from './HeaderMain';

interface ITemplateMain {
  children: React.ReactNode
}

export const TemplateMain: React.FC<ITemplateMain> = ({ children }) => (
  <Html>
    <Head />
    <Container>
      <HeaderMain />

      <Body style={{
        margin: '0 auto',
        fontFamily: "'Lato', sans-serif",
      }}>
        <Container style={{ backgroundColor: '#F1F1F1' }}>

          <ContentCore >
            {children}
          </ContentCore>

          <FooterMain />
          <BaseboardMain />
        </Container>
      </Body>
    </Container>
  </Html>
);
