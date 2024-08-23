import { Container } from '@react-email/components';
import React from 'react';

interface ICardMain {
  children: React.ReactNode
}

export const CardMain: React.FC<ICardMain> = ({ children }) => (
  <Container style={{
    padding: '32px',
    backgroundColor: '#fff',
    borderRadius: '18px',
    margin: '32px',
  }}>
    {children}
  </Container>
);
