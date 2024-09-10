import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store/index.ts';
import { Provider } from 'react-redux';

import './styles/index.sass';
import './fonts/font.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainSection } from './components/Sections/SectionMain/index.tsx';
import { CatalogSection } from './components/Sections/SectionCatalog/index.tsx';

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
            element: <CatalogSection />,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
);
