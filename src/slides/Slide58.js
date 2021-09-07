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
                    showHighLightButtons={true}
                    handleHiglight={handleHiglight}
                    handleErase={handleErase}
                />
                <div className="flex">
                    <div className="col-100">
                        <p>Repasemos los 4 puntos:</p>
                        <Timeline>
                            <TimelineArticle title={'1 Situación o contexto'}>
                                <p>Para iniciar tu respuesta, proporciona al entrevistador la suficiente información de antecedentes para que pueda comprender la situación.</p>


                            </TimelineArticle>
                            <TimelineArticle title={'2 Tarea'}>
<p>Debes informar al entrevistador sobre la tarea o el objetivo que debías cumplir dentro de esta situación en particular. La tarea debe estar relacionada a la competencia en mención.</p>



                            </TimelineArticle>
                            <TimelineArticle title={'3 Acciones'}>

<p>Asegúrate de informar al entrevistador de todas las acciones relevantes que tomaste en la situación y que te permitieron cumplir con la tarea. Ayuda al entrevistador a comprender <b>por qué</b> actuaste de cierta manera.</p>



                            </TimelineArticle>
                            <TimelineArticle title={'4 Resultados'}>

<p>Déjale saber al entrevistador qué resultados surgieron de tus acciones y qué tan impactantes fueron. Si está en tus posibilidades, acompaña los resultados con números e indicadores. Ejemplos:</p>

<ul className="regular">
	<li>“... finalmente, logré culminar el ciclo dentro del <i>décimo superior</i> de mi promoción”</li>
	<li>“... logré reducir en <i>30%</i> las mermas de producción”.</li>
</ul>
                            </TimelineArticle>
                        </Timeline>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);