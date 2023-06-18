import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogs } from '../../redux/actions';
import Card from '../Card/Card';
import css from './Cards.module.css'


const Cards = () => {
    
const dispatch = useDispatch();
const allDogs = useSelector((state) => state.allDogs);




useEffect(() => {
    dispatch(getDogs());
}, [])

    return(
        <div className="cards_container">
            { allDogs.map((dog) => {
                return(
                    <Card key={dog.id} id={dog.id} name={dog.name} image={dog.image} origin={dog.origin} Temperaments={dog.Temperaments}/> 
                )
            })}
        </div>
    )
}



export default Cards;