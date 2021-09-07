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
import picFile from '../img/RLE_M3_39.jpg';
import Link from '../components/Link';

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
                    <div className="col-50">
                        <ul className="regular tempor">
                            <li>Es casi imposible que no te pregunten sobre la empresa y la posición, asiste a la entrevista bien informado/a.</li>
                            <li>Además de la preparación, un factor diferenciador es la práctica. Cuanto más practiques más seguro/a te sentirás. Se coherente con tu CV. Practica STAR.</li>
                            <li>La actitud que muestres durante la entrevista puede ser el factor decisivo para ser elegido/a. Esta actitud debe ser consistente durante todo el proceso de selección.</li>
                            <li>La entrevista es una oportunidad para que como candidato valides información que te ayudará a tomar decisiones. Estas pueden estar basadas en el ambiente laboral que hayas percibido (¿la oficina era un espacio agradable, ordenado?), en el trato que te dieron (¿fueron puntuales?, ¿amables?) en la actitud del entrevistador (¿demostró profesionalismo, estaba preparado(a)?), etc. Recuerda prestar atención a estos detalles, tú decides dónde contribuir con tu talento.</li>
                        </ul>

                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        {/* <p className="pic-footer">{image.footText}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);