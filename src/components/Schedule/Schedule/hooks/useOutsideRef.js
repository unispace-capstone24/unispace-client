import { useEffect, useRef } from "react";

const useOutsideRef = (handler, ...deps) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, ...deps]);

  return inputRef;
};

export default useOutsideRef;
