import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_01.jpg';
import GlossaryModal from '../components/GlossaryModal'
import Accordion from '../components/Accordion';
import AccordionArticle from '../components/AccordionArticle';


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
                        <p>Diferenciemos conceptos:</p>
                        <p>Menús desplegables</p>
                        <Accordion>
                            <AccordionArticle title={'Marca personal'}>
                                <p><GlossaryModal term={'Marca personal'} text={'Marca personal'} color={'#00BFFF'} /> es la <b>manera en la que las personas perciben quién eres a raíz de cómo te comportas, te comunicas e interactúas con el resto</b>. En el ámbito profesional, es la manera en que las personas perciben tu trabajo, tu desempeño, el valor que aportas con estos, y lo más importante, cómo perciben las relaciones que construyes con tus compañeros de clase o de trabajo.</p>
                            </AccordionArticle>
                            <AccordionArticle title={'Marketing personal o profesional'}>
                                <p>Por otro lado, <b>Marketing personal, o profesional</b> cuando nos situamos en ese terreno, se refiere a <b>cómo gestionamos los atributos que aporta nuestra marca profesional y cómo logramos que esta se posicione en nuestro mercado laboral objetivo</b>, ya sea dentro de la organización donde trabajamos o fuera de esta, atrayendo a personas claves del ámbito de nuestra especialidad y por lo tanto, generándonos mayores oportunidades de crecimiento profesional.</p>
                            </AccordionArticle>
                        </Accordion>
                        <p className="m-t">Actualmente, una estrategia exitosa de marketing profesional es la que se logra online, a través del uso de redes sociales y profesionales. Esta debe variar en función a los objetivos que nos vayamos trazando, por ejemplo, conseguir nuestro primer empleo, lograr un ascenso, emprender, entre otros. Asimismo, se deberá redefinir en función a los cambios que atraviesa el mundo laboral y el impacto que estos generan en sus demandas.</p>
                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img src={image.src} alt={image.alt} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
