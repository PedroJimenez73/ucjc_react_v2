import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';

class Slide extends Component {
    constructor() {
        super()
        autoBind(this);
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        this.getData()
    }

    getData() {

    }

    render() {
        const { currentPage } = this.props.sco;
        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={false}
                        />
                <div className="flex">
                    <div className="col-100">
                        <ul>
                            <li>Azurmendi, A. (2011). <i>Derecho de la Comunicación</i>. Bosch. </li>
                            <li><i>Constitución española de 1978</i></li>
                            <li><i>Declaración de los Derechos Humanos</i> – Organización de las Naciones Unidas</li>
                            <li>Escobar de la Serna, L. (2004). <i>Derecho de la Información</i>. Dykinson. </li>
                            <li><i>Ley Orgánica 10/1995, de 23 de noviembre</i>, del Código Penal</li>
                            <li>Miserachs Sala, P. (2014). <i>Estudios sobre la propiedad intelectual y la sociedad de la información: entre la ley y la utopía</i>. Atelier libros jurídicos.</li>
                            <li>Sanjurjo Rebollo, B. (2009). <i>Manual de Derecho de la Información</i>. Dykinson. </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);