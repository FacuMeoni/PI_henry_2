import css from './searchBar.module.css'
import searchLogo from '../../assets/search-magnifying-glass-svgrepo-com.svg';
import { useSelector } from 'react-redux';


const SearchBar = () => {

    const dogFounded = useSelector(state => state.allDogs);

    
    const onSearch = () => {
        
    }
    

    return(
        <div className={css.form_search}>
            <button><img src={searchLogo}/></button>
        </div>
    )
}


export default SearchBar;