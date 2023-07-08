import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import userRouter from './routes/userRouter';
import adminRouter from './routes/adminRouter';
import routesRouter from './routes/routeRouter';
import { globalErrorHandler } from './controller/errorController';
import { AppError } from './utils/appError';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/routes', routesRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Route not founed!', 404));
});

app.use(globalErrorHandler);

export default app;

//this comment for testing purpose
