import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './views/homePage/homePage';
import Landing from './views/landingPage/landingPage';
import Form from './views/formPage/formPage';
import Detail from './views/detailPage/detailPage';
import About from './views/aboutPage/aboutPage';  

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
