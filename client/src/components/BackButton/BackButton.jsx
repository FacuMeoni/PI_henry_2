import css from './backButton.module.css';
import backArrow from '../../assets/arrow-left-335-svgrepo-com.svg'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { setActiveLi } from '../../redux/actions';


const BackButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    
    function onClick (){
        dispatch(setActiveLi(1))
        navigate('/home')
    }

    return(
        <div className={css.back_button} onClick={() => onClick()}>
            <img src={backArrow} alt="left-arrow"/>
        </div>
    )
}


export default BackButton;