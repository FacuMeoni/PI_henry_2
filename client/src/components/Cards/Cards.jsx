import css from '../Card/Card.module.css'
import Card from '../Card/Card';

const Cards = ( { currentDogs } ) => {
    



    return(
        <div className={css.cards_container}>
           {currentDogs && currentDogs.map((dog) => 
             <Card key={dog.id} id={dog.id} name={dog.name} image={dog.image} origin={dog.origin} Temperaments={dog.Temperaments} weight={dog.weight}/>
            )}
            {currentDogs.length === 0 && <span>Dont found any dog, please search again</span>}
        </div>
    )
}


export default Cards;