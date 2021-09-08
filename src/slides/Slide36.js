import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import Link from '../components/Link';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_23.jpg';

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
                    <div className="col-50">
                        <p>Según Michael Page, <b>desarrollar una</b> <GlossaryModal term={'Red de contactos (Networking)'} text={'red de contactos'} color={'#00BFFF'} /> <b> es vital para el desarrollo de tu carrera profesional</b>, esto te proporcionará información sobre tendencias y acceso a mayores oportunidades laborales en el mercado (Paige, M., 2020). Actualmente, una manera de ampliar y mantener una red de contactos es a través de las redes sociales profesionales.</p>

                        <p>Existen diversos niveles en una red de contactos. Dentro de nuestro círculo más cercano se encuentran nuestros familiares, amigos, excompañeros de colegio, amigos de estudios o trabajo. Luego, esta red se extiende a un segundo nivel donde podemos incluir a profesores, antiguos jefes de prácticas o de primeras experiencias laborales, amigos cercanos de tus familiares con los que tengas interacción, etc. Todo contacto dentro de tu campo de interés profesional.</p>

                        <p><b>¿Cómo mantener y potenciar una red de contactos?</b> Jeffrey Gitomer, en su libro “El pequeño libro negro de las conexiones”, menciona: “Mucha gente trata de hacer todo solos. Se sienten incómodos utilizando sus contactos o no los conocen lo suficiente para pedirles un favor. ¡Gran error!” Una red de contactos y de soporte, existe para apoyar y apoyarse de las personas que conocemos. De manera que para potenciarla es importante demostrar interés genuino, esto abre la posibilidad de conexión generando confianza e interés mutuo.</p>
                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                        {/* <p className="pic-footer">{image.footText}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);