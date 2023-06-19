import css from './navBar.module.css';
import homeLogo from '../../assets/Home-svgrepo-com.svg';
import aboutLogo from '../../assets/aboout-svgrepo-com.svg';
import createLogo from '../../assets/create-svgrepo-com.svg';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {

    const navigate = useNavigate();



    return (
        <div className={css.nav_container}>
         <div className={css.menu}>
           <SearchBar/>
           <ul>
                 <li>
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