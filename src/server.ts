import App from './app';

import dotenv from 'dotenv';

import { homeRouter } from './routes/homeRouter';
import { userRouter } from './routes/userRouter';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorMiddleware';
import { loggerMiddleware } from './middleware/logger';

dotenv.config();

import "reflect-metadata";
import { createConnection } from "typeorm";

const appInstance: App = new App({
    port: parseInt(process.env.SERVER_PORT, 10)
});
appInstance.app.use(bodyParser.json());
appInstance.app.use(bodyParser.urlencoded({ extended: true }));
appInstance.app.use(loggerMiddleware);
appInstance.app.use(errorMiddleware);
appInstance.app.use('/', homeRouter);

createConnection().then(async connection => {
    appInstance.app.use('/api/users', userRouter);
    // tslint:disable-next-line:no-console
}).catch(error => console.log(error));

appInstance.listen();
