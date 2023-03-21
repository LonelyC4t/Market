import { Header } from './Components/Pages/Header/Header';
import { Footer } from './Components/Pages/Footer/Footer';
import {Outlet, useNavigate} from 'react-router-dom';
import { useWindowWidth } from './Hooks/useWindowWidth';
import { MobileHeader } from './Components/Pages/Mobile/MobileHeader/MobileHeader';
import { MobileFooter } from './Components/Pages/Mobile/MobileFooter/MobileFooter';
import style from "./style.module.css";
import { useToken } from './Hooks/useToken';
import { useEffect } from 'react';



function App() {
  const windowWidth = useWindowWidth();
  const navigate = useNavigate()
  // const location = useLocation();
  const {token} = useToken();
  
  useEffect(()=>{
    if(token) navigate("products")
  },[token])
  
  return (
    <div className={style.App}>
      {/* {location.pathname === "/" ? <div className={style.firstpage}>
          <span>Самое время отправиться за покупками  </span>
          <button className={style.firstpagebutton} onClick={()=>navigate('products')} >ТЫК</button> 
         </div> : null} */}
      { windowWidth < 800 ? <MobileHeader/> : <Header/> }
        <Outlet /> 
      { windowWidth < 800 ? <MobileFooter/> : <Footer/> }
    </div>
  );
};

export default App;
