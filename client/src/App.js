import React from 'react';
import NavBar from './components/navbar/NavBar';
import {BrowserRouter as Router} from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';
import { useState } from 'react';
import { DataProvider} from './GlobalState';
import Home from './components/Home';
// import Footer from './components/footer/Footer';


function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <DataProvider>
      <Router>
            <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            { openMenu ? <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu}/> : null}           
            <Home/>
             {/* <Footer/> */}
      </Router>
    </DataProvider>
  );
}

export default App;
