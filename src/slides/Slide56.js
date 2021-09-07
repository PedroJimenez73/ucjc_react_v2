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
import picFile from '../img/RLE_M3_35.jpg';
import picFile2 from '../img/RLE_M3_36.jpg';
import Accordion from '../components/Accordion';
import AccordionArticle from '../components/AccordionArticle';

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

        const image2 = {
            src: picFile2,
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
                    <div className="col-100">
                        <p>Como toda competencia, las <i>soft skills</i> tienen un sustento teórico. Por lo tanto, para reconocer nuestras habilidades blandas, debemos conocer su definición. Repasa los siguientes ejemplos:</p>
                        <Accordion>
                            <AccordionArticle title={'Trabajo en equipo'}>

                                <p><b>Capacidad de trabajar en conjunto con otras personas, identificándose con la meta grupal</b>. Conocer los procesos, funciones y metas del equipo, y colaborar eficientemente con el cumplimiento y logro de los mismos. Implica tomar en cuenta el aporte personal y el de los otros miembros del equipo, tener en cuenta sus ideas, promoviendo cooperación, comunicación, respeto y consenso.</p>

                                <p>¿Qué tipo de preguntas puedo esperar en una entrevista laboral que estén relacionadas a esta competencia?</p>

                                <ul className="regular">
                                    <li>Cuéntanos sobre alguna situación en la que hayas tenido alguna dificultad interactuando con los miembros de tu equipo.</li>
                                    <li>¿Qué rol sueles ocupar dentro de un equipo?, ¿cómo participas en el logro de los objetivos?</li>
                                    <li>Relátanos alguna situación en la que hayas cometido un error y lo tuviste que explicar al equipo con el que trabajabas.</li>
                                </ul>

                                <div className="wider-pic m-t">
                                    <img src={image.src} alt={image.alt} />
                                </div>
                            </AccordionArticle>
                            <AccordionArticle title={'Adaptabilidad'}>
                                <p>Es la <b>capacidad de ajustarse con rapidez y flexibilidad a los cambios</b> que surgen en la institución, actualizando el plan para lograr cumplir con los objetivos inicialmente trazados. Implica <b>ser versátil para adaptarse</b> a una nueva situación de forma positiva y constructiva.</p>

                                <p>Las preguntas relacionadas a esta competencias puede ser:</p>

                                <ul className="regular">
                                    <li>Cuéntanos sobre alguna situación en donde debiste cambiar tu punto de vista y replantearte nuevas opciones.</li>
                                    <li>Cuéntanos sobre alguna situación, en el trabajo o en la universidad, donde hayas tenido que cambiar tus planes de un momento a otro. ¿Qué sucedió?, ¿qué hiciste?, ¿qué lograste?</li>
                                </ul>
                                <div className="wider-pic m-t">
                                    <img src={image2.src} alt={image2.alt} />
                                </div>
                            </AccordionArticle>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);