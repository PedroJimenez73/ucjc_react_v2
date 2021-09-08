import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import Flip from '../components/Flip';
import FlipCard from '../components/FlipCard';
import picFile from '../img/RLE_M3_13a.jpg';
import picFile2 from '../img/RLE_M3_13b.jpg';
import picFile3 from '../img/RLE_M3_13c.jpg';
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
                        <p>Te sugerimos seguir la siguiente estructura:</p>
                        <Flip>
                            <FlipCard title={'1 Apertura '} pic={picFile}>
                                <p>Inicia con una breve descripción de tu estatus académico o profesional, desde lo básico:</p>

                                <ol className="regular abc">
                                    <li>Nombre y apellido.</li>
                                    <li>Carrera y campo de especialización.</li>
                                </ol>
                            </FlipCard>
                            <FlipCard title={'2 Breve descripción de lo que haces'} pic={picFile2}>

                                <ol className="regular abc">
                                    <li>Puesto laboral más reciente y una muy breve descripción de las responsabilidades que cumpliste.</li>
                                    <li>En caso de no contar con experiencia laboral, presenta un proyecto académico o de investigación que hayas realizado, ¿qué necesidad atendió? o ¿qué problema solucionó? Enfócate en lo que aportaste desde tu rol, no solamente en los logros del equipo.</li>
                                </ol>


                            </FlipCard>
                            <FlipCard title={'3 ¿Por qué deberían elegirte?'} pic={picFile3}>

                                <ol className="regular abc">
                                    <li>Concéntrate en responder la siguiente pregunta: ¿qué te hace diferente?</li>
                                    <li>Brinda una respuesta clara y objetiva del por qué deben elegirte sobre otros profesionales que hacen lo mismo que tú.</li>
                                </ol>
                            </FlipCard>
                        </Flip>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
