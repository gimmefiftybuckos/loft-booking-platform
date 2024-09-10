import { ScrollRestoration } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './pages/Main';

function App() {
   return (
      <>
         <ScrollRestoration />

         <Header isSticky />
         <Main />
         <Footer />
      </>
   );
}

export default App;
