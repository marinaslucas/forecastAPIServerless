import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const { combine, timestamp, json, prettyPrint, simple } = winston.format;

const Logger = winston.createLogger({
  format: combine(timestamp(), json(), process.env.NODE_ENV === 'local' ? prettyPrint() : simple()),
  transports: [new winston.transports.Console()]
});

if (process.env.NODE_ENV === 'production') {
  Logger.add(new WinstonCloudWatch());
}

export default Logger;
