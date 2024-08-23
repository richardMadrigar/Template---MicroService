import AWS from 'aws-sdk';

import { env } from '@shared/Util/Env/Env';

AWS.config.update({
  accessKeyId: env.SES_EMAIL.ACCESS_KEY_ID,
  secretAccessKey: env.SES_EMAIL.SECRET_ACCESS_KEY,
  region: env.SES_EMAIL.REGION,
});

export const AWS_SES = new AWS.SES({ apiVersion: '2012-10-17' });
