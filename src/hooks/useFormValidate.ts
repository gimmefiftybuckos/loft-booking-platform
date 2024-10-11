import { useState } from 'react';

export function useFormValidate<T>(
   initialValues: T,
   validate: (values: T) => Partial<T>
) {
   const [values, setValues] = useState<T>(initialValues);
   const [errors, setErrors] = useState<Partial<T>>({});

   const handleChange = (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: null }));
   };

   const validateForm = () => {
      const newErrors = validate(values);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   return {
      values,
      errors,
      handleChange,
      validateForm,
   } as const;
}
