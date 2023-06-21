import axios from 'axios';
import BackButton from '../../components/BackButton/BackButton';
import { getTemperaments } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import validate from './validations';


const Form = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTemperaments = useSelector(state => state.allTemperaments).map(temp => temp.name).sort((a, b) => a.localeCompare(b));
    const [ errors, setErrors ]= useState({})
    const [ input, setInput ] = useState({
        name: "", 
        image: "",
        minHeight: "",
        maxHeight: "",
        height: "",
        minWeight: "",
        maxWeight: "",
        weight: "",
        maxSpan: "",
        minSpan:"",
        life_span:"",
        origin:"",
        Temperaments:[]
    })
    
    useEffect(() => {
        dispatch(getTemperaments())
    }, []);

    //handles
    function handleChange(event) {
        setInput({
          ...input,
          [event.target.name]: event.target.value
        });
      
        const error = validate(event.target.name, event.target.value);

        setErrors({
          ...errors,
          [event.target.name]: error
        });
      }

    function handleSelect(event) {
        setInput({
            ...input,
            Temperaments:[...input.Temperaments, event.target.value]
        })
    }

    function handleDelete(temp){
        setInput({
            ...input,
            Temperaments: input.Temperaments.filter( temperament => temperament !== temp)
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        const temperament = input.Temperaments.join(', '); 
        const dog = {
            name: input.name,
            image: input.image,
            weight: `${input.minWeight} - ${input.maxWeight}`,
            height: `${input.minHeight} - ${input.maxHeight}`,
            life_span: `${input.minSpan} - ${input.maxSpan}`,
            origin: input.origin,
            temperament: temperament
        }
         if(errors[0]){
            alert('Please check information');
        } else {
        axios.post('http://localhost:3001/dogs', dog).then(() => alert(`Dog create successfully`)).catch(error => alert(error.message)); //post dog

        setInput({
            name: "", 
            image: "",
            minHeight: "",
            maxHeight: "",
            height: "",
            minWeight: "",
            maxWeight: "",
            weight: "",
            maxSpan: "",
            minSpan:"",
            life_span:"",
            origin:"",
            Temperaments:[]
          });
          // vaciamos el estado local
         navigate('/home')
        }
    }


    return(
        <div>
            <BackButton/>
            <h1> Create your Dog! </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} required/>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>Image: </label>
                    <input type="url" placeholder='Must be an URL' value={input.image} name="image" onChange={handleChange}/>
                    {errors.image && <span>{errors.image}</span>}
                </div>
                <div>
                    <label>Origin: </label>
                    <input type="text" value={input.origin} name="origin" onChange={handleChange}/>
                </div>
                <div>
                    <label> Weight: </label>
                    <input type="text" value={input.minWeight} placeholder='min Weight' name="minWeight" onChange={handleChange} required /> - <input value={input.maxWeight}type="text" placeholder='max Weight' name="maxWeight"onChange={handleChange} required/>
                    {errors.minWeight && <span>{errors.minWeight}</span>} {errors.maxWeight && <span>{errors.maxWeight}</span>}
                </div>
                <div>
                    <label> Height: </label>
                    <input type="text" value={input.minHeight} placeholder='min Height' name="minHeight" onChange={handleChange} required/> - <input value={input.maxHeight}type="text" placeholder='max Height' name="maxHeight"onChange={handleChange} required/>
                    {errors.minHeight && <span>{errors.minHeight}</span>} {errors.maxHeight && <span>{errors.maxHeight}</span>}
                </div>
                <div>
                <label> Life Span: </label>
                    <input type="text" value={input.minSpan} placeholder='min Years'  name="minSpan" onChange={handleChange}/> - <input value={input.maxSpan}type="text" placeholder='max Years' name="maxSpan" onChange={handleChange}/>
                    {errors.minSpan && <span>{errors.minSpan}</span>} {errors.maxSpan && <span>{errors.maxSpan}</span>}
                </div>
                <label> Choose Dogs temperaments! </label>
                <select onChange={handleSelect}>
                    {allTemperaments && allTemperaments.map((temp) =>(
                           <option key={Math.random()} name={temp}>{temp}</option>
                    ))}
                </select>
                <div className="temperements-selected">
                    {input.Temperaments.map(temp => (
                            <div key={Math.random()}> 
                                <span>{temp}</span>
                                <button onClick={() => handleDelete(temp)}>x</button>
                            </div> 
                    ))}
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}



export default Form;