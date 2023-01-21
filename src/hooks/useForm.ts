import React, { useState } from 'react';

function useForm<Type>(inputValue: Type) {
  const [values, setValues] = useState(inputValue);

  const handleChange = (event: React.ChangeEvent) => {
    const { value, name }: any = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
export default useForm;
