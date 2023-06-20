import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../redux/actions';



const SearchBar = () => {

    const dispatch = useDispatch();
    
    const [ search, setSearch ] = useState('');

    function handleOnChange(event){
        setSearch(event.target.value)
    }

    function handleSubmit (event) {
        event.preventDefault();
        dispatch(getDogsByName(search));
        setSearch('');
    }

    return(
        <form onSubmit={e => handleSubmit(e)}>
            <input type="search" placeholder="Find any Breed" value={search} onChange={handleOnChange}/>
            <button type="submit">Search</button>
        </form>
    )
}



export default SearchBar;