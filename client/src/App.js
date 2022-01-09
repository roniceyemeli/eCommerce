import './App.css';
import NavBar from './components/navbar/NavBar';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';
import { useState } from 'react';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';


function App() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className="App">
      <Router>
            <NavBar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            { openMenu ? <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu}/> : null}
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/register' element={<Register/>}/>
            </Routes>            
      </Router>
    </div>
  );
}

export default App;
