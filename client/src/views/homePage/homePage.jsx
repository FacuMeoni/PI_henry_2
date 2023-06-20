import css from './homePage.module.css'
import { getDogs, setNumberPage } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../../components/Paginate/Paginate';



const Home = () => {
    
  
  const dispatch = useDispatch();
  
  
  // paginate
  const allDogs = useSelector(state => state.allDogs);
  const currentPage = useSelector(state => state.pageNumber);
  const [ dogsPerPage, setDogsPerpage ] = useState(8); 
  const lastDogIndex = currentPage * dogsPerPage; 
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);
  const totalPages = Math.ceil(allDogs.length / dogsPerPage);

  

  const paginate = (pageNumber) => {
    dispatch(setNumberPage(pageNumber))
  }
  
  
  // loading && render
  
  const [isLoading, setLoading] = useState(true);
  
  const setTime = () => setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    dispatch(getDogs());

    setTime();
  }, [dispatch]);
    
  const setPage = () =>{
    if(!isLoading){
      return (
        <> 
            <Cards currentDogs={currentDogs}/> 
            <Paginate 
            currentPage={currentPage} 
            totalPages={totalPages} 
            paginate={paginate}
          />
          </> );
    }
    else return ( 
        <div className={css.loading}>Loading...</div> );
  }

  //
    return(
        <div className={css.container_home}>
              { setPage() }
        </div>
    )
}



export default Home;