import css from './searchBar.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogsByName } from '../../redux/actions';



const SearchBar = () => {

    const dispatch = useDispatch();
    const allDogs = useSelector(state=> state.allDogs);

    
    const [ search, setSearch ] = useState('');

    function handleOnChange(event){
        setSearch(event.target.value)
    }

    function handleSubmit (event) {
        event.preventDefault();
        dispatch(getDogsByName(search));

        setSearch('');
    }
    // const errorSearch = Array.isArray(allDogs) && allDogs.length === 0;

    return(
        <form onSubmit={e => handleSubmit(e)}>
            <input type="search" placeholder="Find any Breed" value={search} onChange={handleOnChange}/>
            <button type="submit">Search</button>
            {/* <span className={!errorSearch ? css.disabled : css.error_active }>Breed not found</span> */}
        </form>
    )
}



export default SearchBar;