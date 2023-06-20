import css from './Cards.module.css'
import Card from '../Card/Card';

const Cards = ( { currentDogs } ) => {
    
//allDogs and Card Component with properties of them



const cardDogComponent = currentDogs.map((dog) => {
    return(
        <Card key={dog.id} id={dog.id} name={dog.name} image={dog.image} origin={dog.origin} Temperaments={dog.Temperaments}/> 
        )
})



    return(
        <div className="cards_container">
            {cardDogComponent}
        </div>
    )
}


export default Cards;