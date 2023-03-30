import { Header } from './Components/Pages/Header/Header';
import { Footer } from './Components/Pages/Footer/Footer';
import {Outlet, useNavigate} from 'react-router-dom';
import { useWindowWidth } from './Hooks/useWindowWidth';
import { MobileHeader } from './Components/Pages/Header/MobileHeader/MobileHeader';
import { MobileFooter } from './Components/Pages/Footer/MobileFooter/MobileFooter';
import style from "./style.module.css";
import { useToken } from './Hooks/useToken';
import { useEffect } from 'react';



function App() {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate()
 
  const {token} = useToken();
  
  useEffect(()=>{
    if(token) navigate("products")
  },[token])
  
  return (
    <div className={style.App}>
      { windowWidth < 800 ? <MobileHeader/> : <Header/> }
        <Outlet /> 
      { windowWidth < 800 ? <MobileFooter/> : <Footer/> }
    </div>
  );
};

export default App;
