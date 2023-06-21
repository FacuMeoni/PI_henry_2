import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/homePage/homePage';
import Landing from './views/landingPage/landingPage';
import Form from './views/formPage/formPage';
import Detail from './views/detailPage/detailPage';
import About from './views/aboutPage/aboutPage';  
import NavBar from './components/NavBar/navBar';
import { useLocation } from 'react-router-dom';
import BackButton from './components/BackButton/BackButton';

function App() {
  const location = useLocation();
  return (
    <div className="App">
          {/* {location.pathname !== '/' && <NavBar/>}  */}
          {location.pathname !== '/' && location.pathname !== '/home' ? <BackButton/> : null}
          <Routes>
            <Route exact path='/' element={<Landing/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/form' element={<Form/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
          </Routes>
    </div>
  );
}

export default App;
