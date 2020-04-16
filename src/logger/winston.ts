import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.Console()
    ]
});
