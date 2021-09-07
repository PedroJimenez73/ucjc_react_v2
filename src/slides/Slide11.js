import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
import Quote from '../components/Quote';
import VerticalTable from '../components/VerticalTable';
import VerticalTableContent from '../components/VerticalTableContent';
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
        const {currentPage, cmiDataState} = this.props.sco;

        if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
            this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
        }

    }

    render() {
        const {currentPage, deleteHighlight, setHighlight} = this.props.sco;

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
            if(elems.length > 0) {
                console.log('rangy bug');
                for(let i = 0; i < elems.length; i++) {
                    elems[i].classList.remove('highlight');
                }
            }
            deleteHighlight(currentPage - 1);
        }
        const titles = [
            'Coherencia',
            'Constancia',
            'Confianza'
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
                        <Quote text={'<b>Si entendemos por marca personal aquello que nos hace únicos y diferentes del resto de individuos</b> encontramos que el propósito del <i>personal branding</i>, como proceso, es conseguir identificar aquello que te hace valioso, útil y fiable para que te perciban como la persona con quien hay que estar o trabajar.'}
                            author={'(Pérez Ortega, Andrés para Romero Abreu, 2015)'}/>
                        <p className="m-t">Existen actitudes que, independientemente del campo de especialidad, deben ser los pilares de una marca. Entre ellos tenemos:</p>
                        <VerticalTable titles={titles}>
                            <VerticalTableContent>
                                <p>La capacidad de actuar en consecuencia entre lo que digo y hago, de acuerdo con mis principios y valores.</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Trabajar con disciplina, ser perseverante por lograr los objetivos, en todo momento.</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Generar seguridad de que voy a cumplir con mi palabra, cumpliéndola desde el primer momento. La confianza es el pilar más importante de mi reputación.</p>
                            </VerticalTableContent>
                        </VerticalTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
