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
import VerticalTable from '../components/VerticalTable';
import VerticalTableContent from '../components/VerticalTableContent';

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

            const titles = [
                'Según la estructura y el formato',
                'Según cuánta gente participe',
                'Según la forma de desarrollarse'
            ]
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
                        <p className="m-b">Existen diversas formas de clasificar los tipos de entrevista:</p>
                        <VerticalTable titles={titles}>
                            <VerticalTableContent>
                                <p>En función de la estructura y formato, existen las entrevistas <b>estructuradas,</b> <b>semiestructuradas o libres</b>. En una entrevista estructurada el entrevistador cuenta con una lista de preguntas que realizará por igual a todos los candidatos. Mientras que la entrevista no estructurada o libre, deja lugar a preguntas improvisadas que se van construyendo con base en las respuestas que dé el candidato. Y la entrevista semiestructurada, es una mezcla de ambos formatos.</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Por otro lado, dependiendo de la cantidad de personas que participen, existen las entrevistas <b>individuales y de grupo o panel</b>. Donde las últimas pueden darse entre un entrevistador y varios candidatos o un candidato y un panel de jurados (miembros de la empresa).</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Finalmente, una entrevista puede darse de manera <b>presencial o virtual</b>. Para ambas, debes prepararte con el mismo esfuerzo.</p>
                            </VerticalTableContent>
                        </VerticalTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);