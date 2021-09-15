import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import Titles from '../components/Titles';
import Flip from '../components/Flip';
import FlipCard from '../components/FlipCard';
import picFile1 from '../img/pic5.jpg';
import picFile2 from '../img/pic6.jpg';
import picFile3 from '../img/pic7.jpg';

class Slide extends Component {

    constructor() {
        super()
        rangy.init();
        this.highlighter = rangy.createHighlighter();
        autoBind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const {currentPage, cmiDataState} = this.props.sco;
        setTimeout(()=> {
            if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
                this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
            }
        }, 500)
    }

    render() {
        const {currentPage, deleteHighlight, setHighlight} = this.props.sco;

        this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a", "li"]
        }));

        const handleHiglight = () => {
            deleteHighlight(currentPage - 1);
            this.highlighter.highlightSelection("highlight", {containerElementId: 'selectable'});
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

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-100">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic itaque, dolor dolorem laboriosam ipsum praesentium doloremque qui, placeat est eaque dolore omnis.</p>
                        <Flip>
                            <FlipCard key={0} title={'<i>Opening</i>'} pic={picFile1}>
                                <p>Inicia con una breve descripción de tu estatus académico o profesional, desde lo básico:</p>
                                <ol className="abc">
                                    <li>Nombre y apellido.</li>
                                    <li>Carrera y campo de especialización.</li>
                                </ol>
                            </FlipCard>
                            <FlipCard key={1} title={'Breve descripción de lo que haces'} pic={picFile2}>
                                <ol className="abc">
                                    <li>Puesto laboral más reciente y una muy breve descripción de las responsabilidades que cumpliste.</li>
                                    <li>En caso de no contar con experiencia laboral, presenta un proyecto académico o de investigación que hayas realizado, ¿qué necesidad atendió? o ¿qué problema solucionó? Enfócate en lo que aportaste desde tu rol, no solamente en los logros del equipo.</li>
                                </ol>
                            </FlipCard>
                            <FlipCard key={2} title={'¿Por qué deberían elegirte?'} pic={picFile3}>
                                <ol className="abc">
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
