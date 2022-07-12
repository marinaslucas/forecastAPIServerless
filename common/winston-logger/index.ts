interface Payload {
  context: string;
  [key: string]: any;
}

const Logger = () => {
  function formatPayload(payload: Payload | string): string {
    if (typeof payload === 'string') {
      return payload;
    } else {
      return JSON.stringify(payload);
    }
  }

  function log(payload: Payload | string) {
    console['log'](formatPayload(payload));
  }

  function info(payload: Payload | string) {
    console['info'](formatPayload(payload));
  }

  function error(payload: Payload | string) {
    console['error'](formatPayload(payload));
  }

  function warn(payload: Payload | string) {
    console['warn'](formatPayload(payload));
  }

  return {
    info,
    error,
    warn,
    log
  };
};

export default Logger();
