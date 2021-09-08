import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_26.jpg';

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
                            <li>Contar con una estrategia para planificar la búsqueda de prácticas y/o empleo, es un factor clave a tener en consideración para asegurar el éxito del proceso.</li>
                            <li>Es importante que luego de iniciar nuestras postulaciones, mantengamos un orden que nos permita organizarnos y no perder la calma. Por lo que una bitácora de postulaciones puede ser la herramienta ideal.</li>
                            <li>Construir nuestras herramientas de empleabilidad como son el CV y el perfil de LinkedIn, nos  ayuda a acercarnos a nuestros objetivos profesionales. Evalúa constantemente cómo están tus herramientas y mejóralas. Siempre encontrarás algún aspecto para enriquecerlas.</li>
                            <li>Trabajar la red de contactos es esencial para el desarrollo profesional, no solo cuando estás buscando empleo. Por lo que procura activar primero tus contactos cercanos para luego extenderla a un marco más amplio de relaciones sociales.</li>
                            <li>LinkedIn es la red profesional por excelencia, por lo que contar con un perfil en esta red te permitirá, hoy y en el futuro, llegar a múltiples contactos, y ser visible a reclutadores y posibles empleadores. Al igual que tu CV, debes mantenerlo siempre actualizado.</li>
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