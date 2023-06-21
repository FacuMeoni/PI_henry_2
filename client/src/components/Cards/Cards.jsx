import css from './Cards.module.css'
import Card from '../Card/Card';

const Cards = ( { currentDogs } ) => {
    



    return(
        <div className="cards_container">
            {currentDogs && currentDogs.map((dog) => 
             <Card key={dog.id} id={dog.id} name={dog.name} image={dog.image} origin={dog.origin} Temperaments={dog.Temperaments} weight={dog.weight}/>
            )}
        </div>
    )
}


export default Cards;