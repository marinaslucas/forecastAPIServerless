const LEVEL_INFO = 'info';
const LEVEL_PENDING = 'pending';
const LEVEL_ERROR = 'error';
const LEVEL_WARN = 'warn';
const LEVEL_FAIL = 'fail';
const STRINGFY_LEVEL = 2
/**
 * @interface Payload
 * @param context - Contexto atual do log, passos do processamento.
 * @param data - Informações gerais do log.
 */
interface Payload {
  context: string;
  data?: any;
}

type StartLogReturn = () => {
  duration: number;
} & Payload;

type Level = 'info' | 'pending' | 'error' | 'warn' | 'fail';

function logLevel(level: Level, payload: Payload) {
  const logObject = { level, payload };
  switch (level) {
    case LEVEL_INFO:
      console.info(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
    case LEVEL_PENDING:
      console.info(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
    case LEVEL_ERROR:
      console.error(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
    case LEVEL_WARN:
      console.warn(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
    case LEVEL_FAIL:
      console.error(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
    default:
      console.info(JSON.stringify(logObject, null, STRINGFY_LEVEL));
      break;
  }
}

function log(level: Level, payload: Payload) {
  logLevel(level, payload);
  return payload;
}

function info(payload: Payload) {
  return log(LEVEL_INFO, payload);
}

function pending(payload: Payload) {
  return log(LEVEL_PENDING, payload);
}

function error(payload: Payload) {
  return log(LEVEL_ERROR, payload);
}

function fail(payload: Payload) {
  return log(LEVEL_FAIL, payload);
}

function warn(payload: Payload) {
  return log(LEVEL_WARN, payload);
}

/**
 * @description Logger padrão que rastreia a duração de processamentos.
 * @param {Payload} payload
 * @param {string} level
 * @return endLog()
 */
function startLog(payload: Payload, level: Level = 'info'): StartLogReturn {
  const startDate = new Date();
  const logPayload = {
    info,
    pending,
    error,
    warn,
    fail
  }[level](payload);

  return () => ({
    ...logPayload,
    duration: (new Date().getTime() - startDate.getTime()) / 1000
  });
}

export default {
  startLog
};
