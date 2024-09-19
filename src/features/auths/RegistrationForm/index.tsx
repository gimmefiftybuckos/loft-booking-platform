import { useReducer } from 'react';

import { TRegisterData } from '../../../services/api';
import { useDispatch } from '../../../store';
import { registerUser } from '../../../store/userAuthSlice';
import { authReducer, AuthsValues } from '../authsUtils';

import { Input } from '../../../components/Input';
import { Button, ButtonVariant } from '../../../components/Button';

export const RegistrationForm = () => {
   const dispatchRedux = useDispatch();

   const [registrState, dispatchReducer] = useReducer(
      authReducer<TRegisterData>,
      {
         email: '',
         login: '',
         password: '',
      }
   );

   const onSubmit = () => {
      event?.preventDefault();
      dispatchRedux(registerUser(registrState));
   };

   return (
      <form onSubmit={onSubmit} action='submit'>
         <Input
            type='text'
            placeholder='email'
            value={registrState.email}
            onChange={(event) =>
               dispatchReducer({
                  payload: event.target.value,
                  type: AuthsValues.EMAIL,
               })
            }
         />
         <Input
            type='text'
            placeholder='login'
            value={registrState.login}
            onChange={(event) =>
               dispatchReducer({
                  payload: event.target.value,
                  type: AuthsValues.LOGIN,
               })
            }
         />
         <Input
            type='password'
            placeholder='password'
            value={registrState.password}
            onChange={(event) =>
               dispatchReducer({
                  payload: event.target.value,
                  type: AuthsValues.PASSWORD,
               })
            }
         />
         <Button variant={ButtonVariant.ACCENT} type='submit'>
            Зарегистрироваться
         </Button>
      </form>
   );
};
