import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import VerticalTable from '../components/VerticalTable';
import VerticalTableContent from '../components/VerticalTableContent';
import picFile from '../img/RLE_M3_12.jpg';
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
        const image = {
            src: picFile,
            alt: 'imagen',
            footText: ''
        };
        const titles = [
            'De qué trata tu marca',
            'Cuál es tu motivación e intereses',
            'Qué valor aporta tu talento, qué problemática solucionas con tus capacidades'
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
                    <div className="col-50">
                        <p>Un <GlossaryModal term={'<i>Pitch </i>personal'} text={'<i>pitch</i> personal'} color={'#00BFFF'} /> es una herramienta muy útil para cuando disponemos de pocos minutos para presentarnos y generar una primera impresión. Es una presentación breve, concisa y muy clara de ti mismo. Debe durar entre 30 segundos y un minuto y debe resumir la siguiente información:</p>
                        <VerticalTable titles={titles}>
                            <VerticalTableContent>
                                <p>Quién eres.</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Qué deseas lograr o estás logrando.</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>En qué te diferencias.</p>
                            </VerticalTableContent>
                        </VerticalTable>
                        <p className="m-t">La base de tu discurso debe atraer a los oyentes, transmitir buena actitud, provocar curiosidad.</p>

                        <div className="super-text">
                            <p>Recuerda que si te encuentras buscando una oportunidad laboral, es importante adaptar tu <i>pitch</i> personal a la posición y empresa a la que estás postulando.</p>
                        </div>

                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        <p className="pic-footer">{image.footText}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
