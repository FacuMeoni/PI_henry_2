import css from './homePage.module.css'
import Cards from '../../components/Cards/Cards';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/navBar';


const Home = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, []);


    if(isLoading)return <div className="loading-containter">Loading...</div>

    
    return(
        <div className={css.container_home}>
            <NavBar/>
            <span> HomePage</span>
            <Cards/>
        </div>
    )
}



export default Home;