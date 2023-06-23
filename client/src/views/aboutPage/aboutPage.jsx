import BackButton from '../../components/BackButton/BackButton';
import React from 'react'
import css from './about.module.css'


class About extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={css.all_about}>
                <p className={css.about_container}>Hola, soy facundo. Tengo 20 años. Soy de Argentina, y mi sueño es ser programdor. Este es mi PI-henry-dogs, espero que lo disfruten!</p>
            </div>
        )
    }
}


export default About;