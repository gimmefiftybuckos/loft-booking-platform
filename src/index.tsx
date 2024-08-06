import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store/index.ts';
import { Provider } from 'react-redux';

import './styles/index.sass';
import './fonts/font.sass';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
);
