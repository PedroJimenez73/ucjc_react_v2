import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_31.jpg';

class Slide extends Component {
    constructor() {
        super()
        rangy.init();
        this.highlighter = rangy.createHighlighter();
        autoBind(this);
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        this.getData()
    }

    getData() {
        const { currentPage, cmiDataState } = this.props.sco;

        if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
            this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
        }

    }
    render() {
        const { currentPage, deleteHighlight, setHighlight } = this.props.sco;

        this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a", "b", "li"]
        }));

        const handleHiglight = () => {
            deleteHighlight(currentPage - 1);
            this.highlighter.highlightSelection("highlight");
            const serializedHighlights = this.highlighter.serialize();
            setHighlight(currentPage - 1, serializedHighlights)
        }

        const handleErase = () => {
            this.highlighter.removeAllHighlights()
            const elems = document.getElementsByClassName('highlight');
            if (elems.length > 0) {
                console.log('rangy bug');
                for (let i = 0; i < elems.length; i++) {
                    elems[i].classList.remove('highlight');
                }
            }
            deleteHighlight(currentPage - 1);
        }

        const image = {
            src: picFile,
            alt: 'imagen',
            footText: ''
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                    subtitle={''}
                    showHighLightButtons={true}
                    handleHiglight={handleHiglight}
                    handleErase={handleErase}
                />
                <div className="flex">
                    <div className="col-50 pic-container-left fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        {/* <p className="pic-footer">{image.footText}</p> */}
                    </div>
                    <div className="col-50">
<p><b>A. Preguntas motivacionales</b></p>


<p>Las preguntas motivacionales en una entrevista están <b>diseñadas para que el entrevistador pueda conocer a detalle el interés y motivación del postulante respecto a la posición en específico y a la empresa, en general.</b> Buscará conocer sobre su proceso de preparación para la entrevista y evidenciar sus conocimientos sobre la empresa, la posición y las funciones que esta implica. Es importante que <b>el candidato logre alinear sus objetivos profesionales con la vacante</b> para responder de manera convincente. Algunos ejemplos de preguntas son:</p>


<ul className="regular">
	<li>¿Por qué te interesa este trabajo?</li>
	<li>¿Qué sabes sobre nuestra organización?</li>
	<li>¿Por qué nos encuentras interesantes para trabajar?</li>
	<li>¿Qué aspectos del trabajo te interesan o te atraen más?</li>
	<li>¿Qué pasos has tomado para obtener información sobre el puesto de trabajo?,¿qué te animó a postular?</li>
	<li>¿Qué aspectos de tu experiencia laboral previa has disfrutado y por qué?</li>
</ul>

<p>Te recomendamos que elabores tus respuestas considerando:</p>

<ul className="regular tempor">
	<li>Los valores y la cultura de la organización y cómo estos encajan con los tuyos.</li>
	<li>Por qué las actividades centrales de la organización te atraen.</li>
	<li>Las oportunidades de capacitación y desarrollo que sepas que ofrece la empresa.</li>
	<li>Los aspectos del trabajo que desde tu perspectiva pueden ser desafiantes y te generarán una oportunidad de crecimiento.</li>
	<li>No te sugerimos que tu motivación esté únicamente centrada en el sueldo o gratificaciones monetarias.</li>
</ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);