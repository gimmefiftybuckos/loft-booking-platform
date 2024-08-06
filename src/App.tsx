import clsx from 'clsx';

import styles from './styles/main.module.sass';
import { Button } from './components/Button';

function App() {
   return (
      <>
         <header className={clsx(styles.containers)}>
            <Button>text</Button>
            <Button outlined>text</Button>
            <Button accented>text</Button>
            <Button accented outlined>
               text
            </Button>
         </header>
      </>
   );
}

export default App;
