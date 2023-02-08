import React, { useState } from 'react';

function useForm<Type extends {[key: string]: string}>(inputValue: Type) {
  const [values, setValues] = useState(inputValue);

  const handleChange = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
export default useForm;
