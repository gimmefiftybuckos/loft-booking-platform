import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/index.sass';
import './fonts/font.sass';

import store from './store/index.ts';

import App from './App.tsx';
import { MainSection } from './parts/sections/SectionMain/index.tsx';
import { Catalog } from './pages/Catalog/index.tsx';
import { Loft } from './pages/Loft/index.tsx';

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
            element: <Loft />,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
