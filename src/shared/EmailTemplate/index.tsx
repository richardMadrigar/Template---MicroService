/* eslint-disable import/extensions */
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOMServer from 'react-dom/server';

import { WelcomeResetPassword } from './Templates/WelcomeResetPassword';

const previewEmail = () => {
  // const htmlContent = ReactDOMServer.renderToString(TemplateBase({ props: 'https://example.com' }));
  const htmlContent = ReactDOMServer.renderToString(<WelcomeResetPassword id='123'/>);

  fs.writeFileSync('email-preview.html', htmlContent);

  // eslint-disable-next-line no-console
  console.log('Email HTML salvo como email-preview.html');
};

// Exemplo de uso
previewEmail();
