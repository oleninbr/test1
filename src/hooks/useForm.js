import { useState, useEffect } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Очищення помилок коли значення змінюється
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  // Валідація required полів
  const validate = () => {
    const newErrors = {};
    Object.keys(values).forEach((field) => {
      if (!values[field] || !values[field].trim()) {
        const prettyField = field.replace(/([A-Z])/g, ' $1').toLowerCase();
        newErrors[field] = `The ${prettyField} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Функція для обробки сабміту - викликається в компоненті
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (!validate()) return false;
    callback();
    return true;
  };

  // Якщо пропс initialValues змінився (наприклад при редагуванні), оновлюємо стан
  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
