import { Input } from '../../../components/Input';

export const RegistrationForm = () => {
   const onSubmit = () => {
      event?.preventDefault();
   };

   return (
      <form onSubmit={onSubmit} action='submit'>
         <Input placeholder='email' />
         <Input placeholder='login' />
         <Input placeholder='password' />
         <button type='submit'>Зарегистрироваться</button>
      </form>
   );
};
