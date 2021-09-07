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
import picFile from '../img/RLE_M3_21.jpg';

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
            footText: 'Página web <i>Trabaja con nosotros</i> de la empresa Alicorp. Recuperado de <a href="https://oportunidadesalicorp.com" target="_blank">https://oportunidadesalicorp.com</a>'
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
                        <p>El <GlossaryModal term={'Curriculum Vitae o CV'} text={'currículum vitae'} color={'#00BFFF'} /> (CV) es una <b>herramienta que permite resumir la trayectoria profesional de una persona</b>. Resume principalmente la experiencia laboral, la formación académica, logros, conocimientos e intereses. Actualmente <b>es la herramienta más solicitada por el mercado laboral para iniciar la participación de un postulante en un </b><GlossaryModal term={'Proceso de selección'} text={'proceso de selección'} color={'#00BFFF'} />. Su principal objetivo es permitirle al postulante conseguir una entrevista laboral.</p>
                        <p>La mayoría de los reclutadores admiten que <b>solo dedican entre veinte y treinta segundos en leer el CV de un candidato para decidir si se le llama al proceso de selección </b>(Innes, J., 2012). Incluso algunos señalan que emplean únicamente 10 segundos en revisarlo (Leifman, H., Lerner, M., & The Staff at Vault, 2009).</p>
                        <div className="super-text m-b">
                            <p><b>Entonces, es fácil deducir que la redacción del CV debe ser clara y concisa, fácil de leer, con impecable redacción y ortografía. </b></p>
                        </div>
                        <p>El reclutador espera descubrir qué habilidades has desarrollado en experiencias pasadas que sean significativas para el mundo laboral y para la posición a la cual te encuentras postulando (Doctor CV, 2019). <b>Un CV excelente es el que además está adaptado a la postulación.</b></p>
                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        {/* <p className="pic-footer">{parse(image.footText)}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);