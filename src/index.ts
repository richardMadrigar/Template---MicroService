import 'dotenv/config';

import { app } from './app';
import { logger } from './shared/Util/configLogger';
import { env } from './shared/Util/Env/Env';

const { PORT } = env;

app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
