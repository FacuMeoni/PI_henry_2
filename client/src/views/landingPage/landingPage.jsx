import './landing.css'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();    

    return(
        <div className="container">
            <h1>WELCOME!</h1>
            <button onClick={()=> navigate('/home')}>START</button>
        </div>
    )
}



export default Landing;