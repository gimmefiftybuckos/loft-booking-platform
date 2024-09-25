import { useReducer } from 'react';

import { TLoginData } from '../../../services/api';
import { loginUser } from '../../../store/slices/userAuth';
import { useDispatch } from '../../../store';
import { authReducer, AuthsValues } from '../authsUtils';

import { Input } from '../../../components/Input';
import { Button, ButtonVariant } from '../../../components/Button';

export const LoginForm = () => {
   const dispatchRedux = useDispatch();

   const [loginState, dispatchReducer] = useReducer(authReducer<TLoginData>, {
      login: '',
      password: '',
   });

   const onSubmit = () => {
      event?.preventDefault();
      dispatchRedux(loginUser(loginState)).catch((error) =>
         console.error(error)
      );
   };

   return (
      <form onSubmit={onSubmit} action='submit'>
         <Input
            type='text'
            placeholder='login'
            value={loginState.login}
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
            value={loginState.password}
            onChange={(event) =>
               dispatchReducer({
                  payload: event.target.value,
                  type: AuthsValues.PASSWORD,
               })
            }
         />
         <Button variant={ButtonVariant.ACCENT} type='submit'>
            Войти
         </Button>
      </form>
   );
};
