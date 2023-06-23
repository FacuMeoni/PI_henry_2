import { getDogByID, resetDog} from '../../redux/actions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './detailPage.module.css'



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

      const originDog = dog.origin === 'Unknown' ? 'The origin of this breed is currently unknown' : `They originate from ${dog.origin}`;
      const descriptionDog = `This breed is known for being ${temperamentNames} dogs. With a life expectancy of ${dog.life_span || 'unknown'} years. They typically stand at ${dog.height?.metric || 'an unknown'} centimeters and weigh around ${dog.weight?.metric || 'an unknown'} kilograms. ${originDog}.`

    if(!dog.name)return <div className="loading-container">Loading...</div>;
        
    return (
      <div className={css.all_detail}>
          <div className={css.detail_container}>
            <h2 className={css.name_detail}>{dog.name}</h2>
            <img src={dog.image} alt={`dog-${dog.name}`} />
            <p className={css.description_container}>{descriptionDog}</p>
          </div>
      </div>
        );
};



export default Detail;