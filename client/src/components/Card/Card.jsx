import { useNavigate } from 'react-router-dom';
import css from './Card.module.css'


const Card = ({ id, name, image, origin, Temperaments }) => {

    const detailURL = `/detail/${id}`
    const navigate = useNavigate();
    const temperamentNames = Temperaments?.map(temp => temp.name).join(', ');

   
    return(
        <div className="card-container">
            <span onClick={() => navigate(detailURL)}> {name} </span>
            <img src={image} alt={`dog-${name}`}/>
            <p>Origin: {origin } </p>
            <p>Temperaments: {temperamentNames}</p>
        </div>
    )
}


export default Card;