import Logger from '../logger';

export function sleep(ms: number, log = true): Promise<void> {
  log && Logger.startLog({ context: `Sleeping for ${ms}ms` });
  return new Promise((resolve) => setTimeout(resolve, ms));
}
