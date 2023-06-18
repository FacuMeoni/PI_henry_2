import { getDogByID, resetDog} from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dog = useSelector(state => state.dog)
    
    const temperamentNames = dog.Temperaments?.map(temp => temp.name).join(', ');


    useEffect(() => {
        const dogData = async(id) => {
            try {
              const data = getDogByID(id);
              dispatch(data);
            } catch (error) {
              console.log(error.message);
            }
          };

        dogData(id);

       return () => dispatch(resetDog());
      }, [dispatch, id])

    if(!dog.name)return <div className="loading-container">Loading...</div>;
        
    return (
          <div className="all-detail-container">
            <h1>{dog.name}</h1>
            <img src={dog.image} alt={`dog-${dog.name}`} />
            <p>Origin: {dog.origin}</p>
            {dog.weight && (
              <>
                <p>Weight imperial: {dog.weight.imperial}</p>
                <p>Weight metric: {dog.weight.metric}</p>
              </>
            )}
            {dog.height && (
              <>
                <p>Height imperial: {dog.height.imperial}</p>
                <p>Height metric: {dog.height.metric}</p>
              </>
            )}
            <p>Life span: {dog.life_span}</p>
            <p>Temperaments: {temperamentNames}</p>
          </div>
        );
};



export default Detail;