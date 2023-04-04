import { Header } from './components/header/Header';
import { Footer } from './components/Footer/Footer';
import {Outlet, useNavigate} from 'react-router-dom';
import { useWindowWidth } from './hooks/useWindowWidth';
import { MobileHeader } from './components/header/MobileHeader/MobileHeader';
import { MobileFooter } from './components/Footer/MobileFooter/MobileFooter';
import style from "./style.module.css";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



function App() {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate()
  const {authToken} = useSelector(state => state.user);
 
  useEffect(()=>{
    if(authToken) navigate("/products")
  },[authToken])
  
  return (
    <div className={style.App}>
      { windowWidth < 800 ? <MobileHeader/> : <Header/> }
        <Outlet /> 
      { windowWidth < 800 ? <MobileFooter/> : <Footer/> }
    </div>
  );
};

export default App;
