import { Header } from './Components/Pages/Header/Header';
import { Footer } from './Components/Pages/Footer/Footer';
import {Outlet} from 'react-router-dom';
import { useWindowWidth } from './Hooks/useWindowWidth';
import { MobileHeader } from './Components/Pages/Mobile/MobileHeader/MobileHeader';
import { MobileFooter } from './Components/Pages/Mobile/MobileFooter/MobileFooter';
import style from "./style.module.css";


function App() {
  const windowWidth = useWindowWidth();

  return (
    <div className={style.App}>
      { windowWidth < 800 ? <MobileHeader/> : <Header/> }
        <Outlet /> 
      { windowWidth < 800 ? <MobileFooter/> : <Footer/> }
    </div>
  );
};

export default App;
