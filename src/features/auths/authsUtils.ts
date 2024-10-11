export const initalLoginInput = { login: '', password: '' };
export type TLoginInputValues = typeof initalLoginInput;

export const initalRegistrInput = { email: '', login: '', password: '' };
export type TRegistrInputValues = typeof initalRegistrInput;

const validateCommonFields = (
   values: { login: string; password: string },
   errors: Partial<{ login: string; password: string }>
) => {
   if (!/^[a-zA-Z0-9]+$/.test(values.login)) {
      errors.login = 'Login must contain only Latin letters and numbers';
   }
   if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
      errors.password = 'Password must contain only Latin letters and numbers';
   }

   if (!values.login.trim()) {
      errors.login = 'This field is required';
   }
   if (!values.password.trim()) {
      errors.password = 'This field is required';
   }
};

export const validateLogin = (values: TLoginInputValues) => {
   const errors: Partial<TLoginInputValues> = {};
   validateCommonFields(values, errors);
   return errors;
};

export const validateRegistr = (values: TRegistrInputValues) => {
   const errors: Partial<TRegistrInputValues> = {};

   validateCommonFields(values, errors);

   if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = 'Invalid email format';
   }

   if (values.login.length < 3) {
      errors.login = 'Login must be at least 3 characters long';
   }
   if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
   }

   return errors;
};
