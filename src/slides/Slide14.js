import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import parse from 'html-react-parser';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_06.jpg';

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
            footText: 'Tabla 3. Descripción de las 9 divisiones del <i>Business Model Canvas</i>. Recuperado de <a href="https://www.strategyzer.com/canvas/business-model-canvas" target="_blank">Business Model Canvas – Download the Official Template (strategyzer.com</a>'
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
                    <div className="col-50">
                        <p>Para plasmar de una manera más dinámica los atributos de tu marca y analizarla como un producto o servicio, existe el “lienzo” de modelo de negocio, una herramienta mundialmente utilizada para definir modelos de negocio desde <b>4 áreas</b>: clientes, oferta, infraestructura y viabilidad económica en un recuadro con <b>9 divisiones</b>.</p>

                        <p>Hoy, este modelo es aplicable al análisis de todo tipo de negocio innovador, incluyendo nuestra marca personal, donde lo importante es tener un servicio o producto que genere valor para los clientes.</p>

                        <p>A continuación, te presentamos el análisis de cada una de las 9 divisiones.</p>
                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        <p className="pic-footer">{parse(image.footText)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
