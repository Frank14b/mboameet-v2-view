import { useCallback } from "react";
import secureLocalStorage from "react-secure-storage";

const useLocalStorage = () => {
  //
  const get = useCallback((key: string) => {
    const localStorage = secureLocalStorage;
    return localStorage.getItem(key);
  }, []);

  const set = useCallback((key: string, value: string) => {
    const localStorage = secureLocalStorage;
    return localStorage.setItem(key, value);
  }, []);

  const remove = useCallback((key: string) => {
    const localStorage = secureLocalStorage;
    return localStorage.removeItem(key);
  }, []);

  const clear = useCallback(() => {
    const localStorage = secureLocalStorage;
    return localStorage.clear();
  }, []);

  return { get, set, remove, clear };
};

export default useLocalStorage;
