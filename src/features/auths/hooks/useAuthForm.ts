import { useEffect, useRef, useState } from 'react';

import { useDispatch } from '../../../store';
import { resetError } from '../../../store/slices/userAuth';
import { useFormValidate } from '../../../hooks/useFormValidate';

export const useAuthForm = <T>({
   validate,
   initalInput,
}: {
   validate: (values: T) => Partial<T>;
   initalInput: T;
}) => {
   const dispatchRedux = useDispatch();
   const isMounted = useRef(false);
   const [isChanged, setChanged] = useState(false);

   const { values, errors, handleChange, validateForm } = useFormValidate<T>(
      initalInput,
      validate
   );

   useEffect(() => {
      if (isMounted.current) {
         const isFilled = Object.values(values as {}).every(
            (value) => value !== ''
         );
         setChanged(isFilled);
         dispatchRedux(resetError());
      } else {
         isMounted.current = true;
      }

      return () => {
         dispatchRedux(resetError());
         setChanged(false);
      };
   }, [values]);

   return {
      values,
      errors,
      handleChange,
      validateForm,
      isChanged,
   };
};
