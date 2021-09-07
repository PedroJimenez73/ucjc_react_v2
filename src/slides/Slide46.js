import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Timeline from '../components/Timeline';
import TimelineArticle from '../components/TimelineArticle';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_28.jpg';

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
                    <div className="col-100">
                        <p>Durante una entrevista el reclutador busca en el candidato lo siguiente:</p>
                        <Timeline>
                            <TimelineArticle title={'1'}>

                                <p>Conocer el <b>desempeño</b> del candidato, indagando en su experiencia y haciendo preguntas sobre situaciones reales del pasado.</p>


                            </TimelineArticle>
                            <TimelineArticle title={'2'}>
                                <p>Conocer su <b>motivación, potencial y forma de razonar</b>, colocándolo en situaciones probables del futuro.</p>


                            </TimelineArticle>
                            <TimelineArticle title={'3'}>
                                <p>Definir la <b>disponibilidad</b> del candidato para cumplir inmediatamente las funciones que el puesto requiere (<i>readiness</i>).</p>


                            </TimelineArticle>
                            <TimelineArticle title={'4'}>

                                <p>Confirmar el <b>interés</b> del candidato y ayudarlo a resolver dudas sobre la empresa, la posición y los objetivos del puesto.</p>
                            </TimelineArticle>
                        </Timeline>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);