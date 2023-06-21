import css from './navBar.module.css';
import homeLogo from '../../assets/Home-svgrepo-com.svg';
import aboutLogo from '../../assets/aboout-svgrepo-com.svg';
import createLogo from '../../assets/create-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getDogs, setNumberPage } from '../../redux/actions';
import { setActiveLi } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar.jsx';



const NavBar = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeLiv = useSelector(state => state.activeLi)
   
    
    function onClickHome (){
        dispatch(getDogs())
        dispatch(setNumberPage(1))
        dispatch(setActiveLi(1))
        localStorage.setItem("activeLi", "1");
        navigate('/home')
    }


    function onClickAbout(){
        dispatch(setActiveLi(2))
        localStorage.setItem("activeLi", "2");
        navigate('/about')
    } 

    function onClickForm(){
        dispatch(setActiveLi(3))
        localStorage.setItem("activeLi", "3");
        navigate('/form')
    } 


    return (
        <div className={css.nav_container}>
         <div className={css.menu}>
            <SearchBar/>
           <ul>
                 <li className={activeLiv === 1 ? css.active : ''} onClick={() => onClickHome()}>
                    <img src={homeLogo} alt="Dog house"/>
                     <span>Home</span> 
                 </li>
                 <li className={activeLiv === 2 ? css.active : ''} onClick={() => onClickAbout()}>
                    <img src={aboutLogo} alt="Dog face"/>
                     <span>About Me</span> 
                 </li>
                 <li className={activeLiv === 3 ? css.active : ''} onClick={() => onClickForm()}>
                    <img src={createLogo} alt="Dog form" />
                     <span>Add dog</span> 
                 </li>
           </ul>
         </div>
        </div>
    )
};


export default NavBar;