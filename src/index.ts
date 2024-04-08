import 'express-async-errors';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

dotenv.config();

import app from './app';
import logger from './config/logger';
import errorHandler from './middlewares/error-handler';
import { CustomError } from './models/custom-error';

const port = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGO_URL || '';

if (process.env.ENV && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENV,
    release: `lovely-english-server@${process.env.PACKAGE_VERSION?.replace(/"/g, '')}`,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error: CustomError) {
        return (
          !error?.status ||
          !(error.status === 400 || error.status === 404) ||
          error?.data?.label === 'public-postulant-course'
        );
      },
    }),
  );
}

app.use(errorHandler);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    logger.log({ level: 'info', message: '✅ Database connected', label: 'mongo' });
    app.listen(port, () => {
      logger.log({
        level: 'info',
        message: `Lovely English server listening on port ${port}`,
        label: 'server',
      });
    });
  })
  .catch((error: Error) => {
    logger.log({
      level: 'error',
      message: '🔴 Database error: ',
      errorData: error,
      label: 'mongo',
    });
    app.listen(port, () => {
      logger.log({
        level: 'info',
        message: `Radium Learning server listening on port ${port}`,
        label: 'server',
      });
    });
  });
