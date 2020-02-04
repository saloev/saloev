// TODO debounce
export default (fn: Function, ms: number) => {
  let timeout: number | null = null;

  return () => {
    if (timeout) return;

    timeout = setTimeout(() => {
      fn();
      timeout = null;
    }, ms);
  };
};
