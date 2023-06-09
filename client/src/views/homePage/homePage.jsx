import css from './homePage.module.css'
import { getDogs, setNumberPage, getTemperaments, filterDogsByTemperaments, filterCreatedDog, filterAlphabetically, filterByWeight } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../../components/Paginate/Paginate';

  

const Home = () => {
    
  
  const dispatch = useDispatch();
  const allTemperaments = useSelector(state => state.allTemperaments).sort((a, b) => a.name.localeCompare(b.name));
  const allDogs = useSelector(state => state.dogs);
  
  
  // paginate
  const currentPage = useSelector(state => state.pageNumber);
  const [ dogsPerPage ] = useState(8); 
  const lastDogIndex = currentPage * dogsPerPage; 
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);
  const totalPages = [];
  
  for(let i = 0; i <=  Math.ceil(allDogs.length / dogsPerPage - 1); i++){
    totalPages.push(i + 1);
  }

  const paginate = (pageNumber) => {
    dispatch(setNumberPage(pageNumber))
  }

  //Selects functions


  
 function handleFilterTemperaments(event) {
    const selectedValue = event.target.value;
    dispatch(filterDogsByTemperaments(selectedValue));
    dispatch(setNumberPage(1))
  }


  function handleFilterCreated(event) {
    const selectedValue = event.target.value;
    dispatch(filterCreatedDog(selectedValue))
    dispatch(setNumberPage(1))
  }


  function handleFilterWeight(event) {
    const selectedValue = event.target.value;
    dispatch(filterByWeight(selectedValue))
    dispatch(setNumberPage(1))
  }

  function handleSort(event){
    const selectedValue = event.target.value;
    event.preventDefault();
    dispatch(filterAlphabetically(selectedValue));
    dispatch(setNumberPage(1));
  }

  // loading && render
  

  const [isLoading, setLoading] = useState(true);
  
  const setTime = () => setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());

    setTime();
  }, [dispatch]);

  //
  return (
    <div className={css.container_home}>
      {!isLoading && (
        <div>
          <div className={css.select_container}>

            <select onChange={handleFilterCreated}>
              <option value="" disabled selected hidden>Sort by creation</option>
              <option key="all" value="all">All</option>
              <option key="Api" value="api">Api</option>
              <option key="Created" value="created">Created</option>
            </select>
          <select onChange= {handleSort}>
          <option value="" disabled selected hidden>Sort by alphabetical order</option>
            <option key="a-z" value="a">A</option>
            <option key="z-a"value="z">Z</option>
          </select>
          <select onChange={handleFilterWeight}>
          <option value="" disabled selected hidden>Sort by weight</option>
            <option key='min' value='min'>Min weight</option>
            <option key='max' value='max'>Max weight</option>
          </select>
          <select onChange={e => handleFilterTemperaments(e)}>
          <option value="" disabled selected hidden>Filter by temperaments</option>
            <option key='0'value="all">All</option>
          {allTemperaments &&
            allTemperaments.map((temp) =>
              temp.name ? <option key={temp.id}>{temp.name}</option> : null
            )}
          </select>
          </div>
          <Cards currentDogs={currentDogs} />
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </div>
      )}
      {isLoading && <div className={css.loading}>Loading...</div>}
    </div>
  );
};



export default Home;