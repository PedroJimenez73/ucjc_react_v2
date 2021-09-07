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
import picFile from '../img/RLE_M3_25.jpg';
import { Link } from 'react-router-dom';

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
            footText: 'Infografía LinkedIn. Recuperado de UTEC Career Services.'
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
                        <p>Utiliza las plantillas sugeridas para crear o mejorar tu CV. Puedes elegir la que mejor se ajuste a tu perfil y nivel de experiencia:</p>
                        <Link>
                            <p><a target="_blank" rel="noreferrer" href="https://drive.google.com/drive/folders/1lqQoB83QPffENovfOPesf6LbsyyBpU_G">Modelo de CV enfocado en desarrollo de proyectos (sin experiencia laboral)</a></p>

                            <p><a target="_blank" rel="noreferrer" href="https://drive.google.com/drive/folders/1lqQoB83QPffENovfOPesf6LbsyyBpU_G">Modelo de CV para estudiantes con experiencia laboral</a></p>
                        </Link>
                        <p>Una vez que tengas tu CV listo, evalúa el documento con <a target="_blank" rel="noreferrer" href="https://utec.doctor-cv.pro/">Doctor CV</a>. Para hacerlo:</p>
                        <ol className="regular">
                            <li>Ingresa a la plataforma con tu correo electrónico institucional de UTEC</li>
                            <li>Adjunta tu CV y aguarda por el diagnóstico. Recibirás un archivo pdf.</li>
                            <li>La nota aprobatoria que cumple los requisitos mínimos de un CV efectivo es de 70/100.</li>
                            <li>Si cumples con el puntaje mínimo, adjunta tus resultados para dar por cumplida la actividad de refuerzo</li>
                            <li>En caso de que no apruebes la 1° revisión, puedes aplicar las mejoras sugeridas e intentarlo hasta 3 veces.</li>
                            <li>En caso de no alcanzar el puntaje mínimo, escríbenos a <a target="_blank" rel="noreferrer" href="mailto:careerservices@utec.edu.pe">careerservices@utec.edu.pe</a> para agendar una asesoría personalizada. Te ayudaremos con todo gusto.</li>
                        </ol>

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);