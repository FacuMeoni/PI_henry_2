import css from './navBar.module.css';
import homeLogo from '../../assets/Home-svgrepo-com.svg';
import aboutLogo from '../../assets/aboout-svgrepo-com.svg';
import createLogo from '../../assets/create-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNumberPage } from '../../redux/actions';


const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    function onClickHome (){
        dispatch(setNumberPage(1))
        navigate('/home')
    }


    return (
        <div className={css.nav_container}>
         <div className={css.menu}>
           <ul>
                 <li onClick={() => onClickHome()}>
                    <img src={homeLogo} alt="Dog house"/>
                     <span>Home</span> 
                 </li>
                 <li onClick={() => navigate('/about')}>
                    <img src={aboutLogo} alt="Dog face"/>
                     <span>About Me</span> 
                 </li>
                 <li onClick={() => navigate('/form')}>
                    <img src={createLogo} alt="Dog form" />
                     <span>Add dog</span> 
                 </li>
           </ul>
         </div>
        </div>
    )
};


export default NavBar;