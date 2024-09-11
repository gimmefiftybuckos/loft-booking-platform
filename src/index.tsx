import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/index.sass';
import './fonts/font.sass';

import store from './store/index.ts';

import App from './App.tsx';
import { MainSection } from './components/Sections/SectionMain/index.tsx';
import { Catalog } from './pages/Catalog/index.tsx';

const router = createBrowserRouter([
   {
      path: '/*',
      element: <App />,
      children: [
         {
            element: <MainSection />,
         },
         {
            path: 'catalog',
            element: <Catalog />,
         },
         {
            path: 'catalog/:id',
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
