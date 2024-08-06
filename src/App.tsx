import clsx from 'clsx';

import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Header } from './components/Header';

function App() {
   return (
      <>
         <Header isSticky></Header>
         <main>
            <Routes>
               <Route path='/' element={<Home />} />
            </Routes>
         </main>
         <footer></footer>
      </>
   );
}

export default App;
