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
import picFile from '../img/RLE_M3_32.jpg';
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
                        <p><b>B. </b><b>Preguntas por competencias</b></p>
                        <Accordion>
                            <AccordionArticle title={'¿A qué nos referimos cuando hablamos de competencias?'}>
                                <p>Pues, las competencias son <b>comportamientos observables, medibles, que se aprenden y desarrollan a través de la experiencia</b>.  Están compuestas por conocimientos, habilidades y actitudes. Se subdividen en competencias duras o técnicas (<i>hard skills</i>) y competencias blandas (<i>soft skills</i>).</p>
                            </AccordionArticle>
                            <AccordionArticle title={'¿Cuáles son más importantes?'}>
                                <p>De acuerdo con un estudio realizado por la Universidad de Harvard en colaboración con The Carnegie Foundation y la Universidad de Stanford, <b>el 85% de éxito en el ámbito laboral depende del desarrollo de habilidades blandas</b> (Vardan, V. ,2020). Si bien, <b>la combinación de ambos tipos de competencias es lo que le permitirá a las personas lograr sus objetivos profesionales</b>, LinkedIn menciona que las principales razones por las que los profesionales talentosos son despedidos son la falta de colaboración, la falta de comunicación, falta de responsabilidad (...) Irónicamente, el rendimiento no se encuentra entre las principales razones para despedir.</p>
                            </AccordionArticle>
                        </Accordion>
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