export const wrapFunction = <Args extends any[], R>(fn: (...args: Args) => Promise<R>) => {
  return async (...args: Args): Promise<{ response?: R; err?: Error }> => {
    try {
      const response = await fn(...args);
      return { response };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return { err };
      } else {
        return { err: new Error(String(err)) };
      }
    }
  };
};
