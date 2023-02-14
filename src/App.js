import './style.module.css';
import { Header } from './Components/Pages/Header/Header';
import { Footer } from './Components/Pages/Footer/Footer';
import {Outlet} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWindowWidth } from './Hooks/useWindowWidth';
import { MobileHeader } from './Components/Pages/Mobile/MobileHeader/MobileHeader';
import { MobileFooter } from './Components/Pages/Mobile/MobileFooter/MobileFooter';

const queryClient = new QueryClient();



function App() {
  const WindowWidth = useWindowWidth();
  return (
    <div className="App">
      <header className="App-header">
        
        { WindowWidth < 800 ? <MobileHeader/> : <Header/> }

          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>

        { WindowWidth < 800 ? <MobileFooter/> : <Footer/> }
        
      </header>
    </div>
  );
}

export default App;
