import BackButton from '../../components/BackButton/BackButton';
import React from 'react'


class About extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container-about">
                <BackButton/>
            </div>
        )
    }
}


export default About;