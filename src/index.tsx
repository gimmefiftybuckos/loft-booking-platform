import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store/index.ts';
import { Provider } from 'react-redux';

import './styles/index.sass';
import './fonts/font.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './pages/Main/index.tsx';

const router = createBrowserRouter([
   {
      path: '/*',
      element: <App />,
      children: [
         {
            element: <Main />,
         },
         {
            path: 'catalog',
            element: <Main />,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
