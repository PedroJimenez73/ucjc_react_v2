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
                        <p><b>The Lean Startup</b></p>
                        <p>Página web de Eric Ries con información sobre los libros, artículos y herramientas de uso de <i>Lean Startup</i>.</p>
                        <p>
                            <a href="http://theleanstartup.com/" rel="noreferrer" target="_blank">http://theleanstartup.com/</a>
                        </p>
                        <p><b>¿Por qué <i>lean startup</i> lo va a cambiar todo? Néstor Guerra en TEDxSevilla</b></p>
                        <p>¿Puede la metodología <i>LEAN</i> cambiar el mundo? Este emprendedor plantea que sí en este video de la iniciativa TED.  </p>
                        <p>
                            <a href="https://www.youtube.com/watch?v=E62ecUVZa9Q" rel="noreferrer" target="_blank">https://www.youtube.com/watch?v=E62ecUVZa9Q</a>
                        </p>
                        <p><b>Why Lean Startup changes everything</b></p>
                        <p>Artículo sobre el potencial del <i>Lean Startup</i>. </p>
                        <p>
                            <a href="https://hbr.org/2013/05/why-the-lean-start-up-changes-everything" rel="noreferrer" target="_blank">https://hbr.org/2013/05/why-the-lean-start-up-changes-everything</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
