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
import picFile from '../img/RLE_M3_38.jpg';
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
                    <div className="col-50 pic-container-left fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        {/* <p className="pic-footer">{image.footText}</p> */}
                    </div>
                    <div className="col-50">
                        <p>Utiliza la plantilla de entrenamiento para redactar y analizar las posibles respuestas que darás en una entrevista laboral. Elige entre dos plantillas de entrenamiento, de acuerdo a tu perfil y nivel de experiencia laboral.</p>
                        <Link text={'<p><a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1MxJkuwidriziJm-4Z-oISgCx-X18Hzjo/view?usp=sharing">Plantilla 1: Para estudiantes sin experiencia laboral</a></p><p><a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1LsLaNasuzmJ1aJE8a0KpH11oeZt8kqyY/view?usp=sharing">Plantilla 2: Para estudiantes con experiencia laboral</a></p>'} />                    
                        <p className="m-t">Si requieres de una asesoría personalizada para recibir <i>feedback</i>, puedes escribirnos al correo de <a target="_blank" rel="noreferrer"  href="mailto:careerservices@utec.edu.pe">careerservices@utec.edu.pe</a>. Adjunto al correo la plantilla con la que deseas trabajar durante la sesión, esta debe contener tus respuestas tentativas a 3 o 4 preguntas de tu elección. La asesoría tendrá una duración de 30 minutos.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);