import { useNavigate } from 'react-router-dom';
import css from './Card.module.css'


const Card = ({ id, name, image, origin, Temperaments, weight }) => {

    const detailURL = `/detail/${id}`
    const navigate = useNavigate();
    const temperamentNames = Temperaments?.map(temp => temp.name).join(', ');
    const weightMetric = weight?.metric
   
    return(
        <div className={css.card_container}>
            <h3 onClick={() => navigate(detailURL)}> {name} </h3>
            <img src={image} alt={`dog-${name}`}/>
            <p>Weight: {weightMetric} kg</p>
            <p>Temperaments: {temperamentNames}</p>
        </div>
    )
}


export default Card;