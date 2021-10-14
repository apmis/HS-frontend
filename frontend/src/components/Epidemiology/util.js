import {useCallback, useEffect} from 'react';
/**
 * @param { (...args: any[]) => any } fn - A callback function to use debounce effect on.
 * @param { number } delay - A number that indicates how much time it waits.
 * @param { any[] } deps - A dependency list.
 *
 */
const useDebounce = (fn, delay, deps) => {
  /**
   * Store the memoized version of the callback.
   * It changes only when one of the dependencies has has changed.
   * See official documentation at: https://reactjs.org/docs/hooks-reference.html#usecallback
   * */
  const callback = useCallback(fn, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [callback]);
};

const noop = () => {};

export {useDebounce, noop};
