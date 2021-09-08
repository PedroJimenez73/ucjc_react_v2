import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import PicCarousel from '../components/PicCarousel';
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
                    <div className="col-50 pic-container-left fade-in-delayed">
                       <PicCarousel />
                    </div>
                    <div className="col-50">
                        <p>En las bolsas o portales de empleo especializados, debes crear una cuenta y en varios casos llenar algunos campos de texto para crear un CV.</p>
                        <p>Algunos portales, como <GlossaryModal term={'Conecto'} text={'Conecto'} color={'#00BFFF'} />, el portal laboral exclusivo de UTEC, te permiten adjuntar un CV en formato pdf, debes hacerlo para tener más opciones de que tu perfil sea visto.</p>
                        <div className="super-text">
                            <p>Por otro lado, para realizar un seguimiento semanal de tu plan, es necesario que lleves un <b>registro de las empresas y las vacantes a las que estás postulando</b>; te sugerimos crear una bitácora o agenda que te permita organizar, planificar y seguir tus avances dentro de los procesos de selección.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);