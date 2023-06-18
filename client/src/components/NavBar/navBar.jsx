import css from './navBar.module.css';
import homeLogo from '../../assets/Home-svgrepo-com.svg';
import searchLogo from '../../assets/search-svgrepo-com.svg';
import aboutLogo from '../../assets/aboout-svgrepo-com.svg';
import createLogo from '../../assets/create-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

const navigate = useNavigate();

    return (
        <div className={css.nav_container}>
         <div className={css.menu}>
           <input placeholder='Find any breed'/>
           <ul>
                 <li onClick={() => navigate('/home')}>
                    <img src={homeLogo} alt="Home"/>
                     <span>Home</span> 
                 </li>
                 <li onClick={() => navigate('/about')}>
                    <img src={aboutLogo} alt="about"/>
                     <span>About Me</span> 
                 </li>
                 <li onClick={() => navigate('/form')}>
                    <img src={createLogo} alt="add Dog" />
                     <span>Add dog</span> 
                 </li>
           </ul>
         </div>
        </div>
    )
};


export default NavBar;