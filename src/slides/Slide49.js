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
import picFile from '../img/RLE_M3_30.jpg';

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
                        <p><b>Videoentrevistas o “one-way video interview”</b></p>

                        <p>La videoentrevista o video presentación, es una <b>entrevista grabada y muy corta</b>, la cual se realiza generalmente a través de un <i>software</i> de reclutamiento. En la mayoría de los casos, son <b>entrevistas estructuradas</b> ya que tienen como objetivo medir a todos los candidatos por igual en base al nivel de comunicación, estructura y concreción de ideas y nivel de inglés, en caso de ser un requisito para el puesto de trabajo. El tiempo de respuesta por cada pregunta es de 1 a 3 minutos pero varía dependiendo de la empresa y app que utilice.</p>

                        <p>Las aplicaciones más utilizadas para este tipo de evaluaciones son: <a target="_blank" rel="noreferrer" href="https://www.hirevue.com/">HireViu</a>, <a target="_blank" rel="noreferrer" href="https://www.sparkhire.com/">Spark Hire</a>, <a target="_blank" rel="noreferrer" href="https://www.workable.com/video-interviews">Workable</a> y <a target="_blank" rel="noreferrer" href="https://www.krowdy.com/centraliza-herramientas-en-sistema-de-recursos-humanos?utm_source=Google&amp;utm_medium=organic">Krowdy (video cuestionarios)</a>.</p>

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);