import { useNavigate } from 'react-router-dom';
import css from './Card.module.css'


const Card = ({ id, name, image, origin, Temperaments, weight }) => {

    const detailURL = `/detail/${id}`
    const navigate = useNavigate();
    const temperamentNames = Temperaments?.map(temp => temp.name).join(', ');
    const weightMetric = weight?.metric
   
    return(
        <div className={css.card_container}>
            <div className={css.front}>
                <img src={image} style={{ width: '100%', height: '100%', objectFit:'cover'}} alt={`dog-${name}`}/>
                <h3> {name} </h3>
            </div>
            <div className={css.back}>
                <p className={css.temperaments_container}>{temperamentNames}</p>
                <div className={css.weight_container}><p>{weightMetric} kg</p></div>
                <button onClick={() => navigate(detailURL)}>Read more</button>
            </div>
        </div>
    )
}


export default Card;