import axios from 'axios';
import BackButton from '../../components/BackButton/BackButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import validate from './validations';
import css from './formPage.module.css'
import defaultImage from '../../images/random_dog.jpg'

const Form = () => {

    const navigate = useNavigate();
    const allTemperaments = useSelector(state => state.allTemperaments).sort((a, b) => a.name.localeCompare(b.name));
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

    function handleCancel(event){
        event.preventDefault();
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
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        const temperament = input.Temperaments.join(', '); 
        const dog = {
            name: input.name,
            image: input.image || defaultImage,
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

         navigate('/home')
        }
    }


    return(
        <div className={css.all_form_container}>
            <BackButton/>
            <form onSubmit={handleSubmit} className={css.form}>
                <h1 className={css.title}> Create your Dog! </h1>
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
               <label className={css.temperaments_label}> Choose Dog temperaments! </label>
                <select onChange={handleSelect} className={css.select}>
                    {allTemperaments && allTemperaments.map((temp) =>(
                           <option key={temp.id} name={temp.name}>{temp.name}</option>
                    ))}
                </select>   
                <div className={css.temperements_selected}>
                    {input.Temperaments.map(temp => (
                            <div key={Math.random()}>   
                                <p>{temp}<button onClick={() => handleDelete(temp)}>x</button></p>
                            </div> 
                    ))}
               </div>
               <button onClick={handleCancel}>Cancel</button>
                <button type='submit' disabled={errors.name || errors.maxSpan || errors.image || errors.minSpan || errors.minHeight || errors.maxHeight || errors.minWeight || errors.maxWeight } className={css.create_button}>Create</button>
            </form>
        </div>
    )
}



export default Form;