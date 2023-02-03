import './style.module.css';
import { Header } from './Components/Pages/Header/Header';
import { Footer } from './Components/Pages/Footer/Footer';
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
        <Outlet />
        <Footer></Footer>
      </header>
    </div>
  );
}

export default App;
