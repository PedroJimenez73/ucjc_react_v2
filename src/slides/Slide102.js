import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";

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

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                    subtitle={''}
                    showHighLightButtons={false}
                    handleHiglight={handleHiglight}
                    handleErase={handleErase}
                />
                <div className="flex">
                    <div className="col-100">

<p>Crea tu perfil en Conecto, el portal de UTEC</p>

<p><a target="_blank" rel="noreferrer"  href="https://conecto.utec.edu.pe/">https://conecto.utec.edu.pe/</a></p>

<p>PDF</p>

<p><a target="_blank" rel="noreferrer"  href="https://drive.google.com/file/d/1m-L_CNr8hjFVUSnSP_An5IittUvRWS52/view?usp=sharing">Recomendaciones para la elaboración de un CV por indicadores</a></p>

<p>Recibe tu diagnóstico de currículum con Doctor CV</p>

<p><a target="_blank" rel="noreferrer"  href="https://utec.doctor-cv.pro/">https://utec.doctor-cv.pro/</a></p>

<p>Video</p>

<p><a target="_blank" rel="noreferrer"  href="https://www.youtube.com/watch?v=TDXrFzKBr4Y&amp;t=2s">Pasos que debo seguir para lograr un CV exitoso</a></p>

<p>Guía</p>

<p><a target="_blank" rel="noreferrer"  href="https://drive.google.com/file/d/1wPmE7QCKw4_u2lcVJMToVEafzitV1jSY/view?usp=sharing">¿Cómo responder en una entrevista por competencias?</a></p>

<p>Video</p>

<p><a target="_blank" rel="noreferrer"  href="https://www.youtube.com/watch?v=RYYFIMrnpew">Recomendaciones para afrontar con éxito una entrevista laboral</a></p>


                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
