export enum AuthsValues {
   EMAIL = 'email',
   LOGIN = 'login',
   PASSWORD = 'password',
}

type TAuthTypeActions =
   | { type: AuthsValues.EMAIL; payload: string }
   | { type: AuthsValues.LOGIN; payload: string }
   | { type: AuthsValues.PASSWORD; payload: string };

export const authReducer = <T>(state: T, action: TAuthTypeActions) => {
   switch (action.type) {
      case AuthsValues.LOGIN:
         return { ...state, login: action.payload };
      case AuthsValues.EMAIL:
         return { ...state, email: action.payload };
      case AuthsValues.PASSWORD:
         return { ...state, password: action.payload };
      default:
         return state;
   }
};
