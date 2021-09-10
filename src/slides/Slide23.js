import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Associate from '../components/Associate';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;

        const terms = {
            letfTerms: [
                {letter: 'a', term: 'Contacto visual'},
                {letter: 'b', term: 'Gesto de manos'},
                {letter: 'c', term: 'Dígalo con estilo'},
                {letter: 'd', term: 'Inflexión'},
            ],
            rightTerms: [
                {letter: 'c', term: '¿Cómo sueles contar las cosas? ¿Qué estilo usas?'},
                {letter: 'a', term: '¿Cuándo expones sueles mirar a tu público?'},
                {letter: 'd', term: '¿Juegas con los niveles de tu voz al exponer?'},
                {letter: 'b', term: '¿Cómo sueles poner tus manos cuando expones?'},
            ]
        }
        
        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={true}
                        />
                <div className="row">
                    <div className="col-100">
                        <Associate terms={terms}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
