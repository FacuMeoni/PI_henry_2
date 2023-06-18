import css from './homePage.module.css'
import Cards from '../../components/Cards/Cards';


const Home = () => {
    
    
    return(
        <div className={css.containerHome}>
            <span> HomePage</span>
            <Cards/>
        </div>
    )
}



export default Home;