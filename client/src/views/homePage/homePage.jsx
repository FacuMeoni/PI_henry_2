import css from './homePage.module.css'
import { getDogs, setNumberPage, getTemperaments, filterDogsByTemperaments, filterCreatedDog, filterAlphabetically } from '../../redux/actions';
import Cards from '../../components/Cards/Cards';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../../components/Paginate/Paginate';



const Home = () => {
    
  
  const dispatch = useDispatch();
  const allTemperaments = useSelector(state => state.allTemperaments);
  const allDogs = useSelector(state => state.allDogs);
  
  
  // paginate
  const currentPage = useSelector(state => state.pageNumber);
  const [ dogsPerPage ] = useState(8); 
  const lastDogIndex = currentPage * dogsPerPage; 
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstDogIndex, lastDogIndex);
  const totalPages = Math.ceil(allDogs.length / dogsPerPage);

  

  const paginate = (pageNumber) => {
    dispatch(setNumberPage(pageNumber))
  }

  //Selects functions


  const [tidy, setTidy] = useState('');

function handleFilterTemperaments(event) {
    const selectedValue = event.target.value;
    dispatch(filterDogsByTemperaments(selectedValue));
  }


  function handleFilterCreated(event) {
    const selectedValue = event.target.value;
    dispatch(filterCreatedDog(selectedValue))
  }

  function handleSort(event){
    const selectedValue = event.target.value;
    event.preventDefault();
    dispatch(filterAlphabetically(selectedValue));
    dispatch(setNumberPage(1));
    setTidy(`Tidy ${selectedValue}`)
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
          <select onChange={e => handleFilterCreated(e)}>
            <option key="all" value="all">All</option>
            <option key="Api" value="api">Api</option>
            <option key="Created" value="created">Created</option>
          </select>
          <select onChange= {e => handleSort(e)}>
            <option key="a-z" value="a">A</option>
            <option key="z-a"value="z">Z</option>
          </select>
          <select onChange={e => handleFilterTemperaments(e)}>
            <option key='0'value="all">All</option>
          {allTemperaments &&
            allTemperaments.map((temp) =>
              temp.name ? <option key={temp.id}>{temp.name}</option> : null
            )}
          </select>
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