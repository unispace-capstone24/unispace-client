import { useState } from "react";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  return { value, onChange, resetValue };
};

export default useInput;
