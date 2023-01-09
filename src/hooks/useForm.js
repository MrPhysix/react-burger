import { useState } from 'react';

function useForm(inputValue) {
  const [values, setValues] = useState(inputValue);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
export default useForm;
