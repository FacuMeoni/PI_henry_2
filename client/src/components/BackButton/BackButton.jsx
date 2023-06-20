import css from './backButton.module.css';
import backArrow from '../../assets/arrow-left-335-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom'; 

const BackButton = () => {
    const navigate = useNavigate();

    return(
        <div className={css.back_button} onClick={() => navigate('/home')}>
            <img src={backArrow} alt="left-arrow"/>
        </div>
    )
}


export default BackButton;