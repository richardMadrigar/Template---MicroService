import { Container } from '@react-email/components';
import React from 'react';

import { CardMain } from './CardMain';

interface IContentCore {
  children: React.ReactNode
}

export const ContentCore: React.FC<IContentCore> = ({ children }) => (
  <CardMain >
    <Container style={{ maxHeight: '160px', width: '600px' }}>
      {children}
    </Container>
  </CardMain>
);
