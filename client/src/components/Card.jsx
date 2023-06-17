import { useNavigate } from 'react-router-dom';


const Card = ({ id, name, image, origin, temperaments }) => {

    const navigate = useNavigate();
    const temperamentNames = temperaments?.map(temp => temp.name).join(', ');
    console.log(temperaments);
   
    return(
        <div className="card-container">
            <span onClick={() => navigate(`/detail/${id}`)}>name: {name}</span>
            <img src={image} alt={`dog-${name}`}/>
            <p>Origin: {origin } </p>
            <p>Temperaments: {temperamentNames}</p>
        </div>
    )
}


export default Card;