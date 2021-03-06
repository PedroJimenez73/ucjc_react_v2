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
                                <p>Inicia con una breve descripci??n de tu estatus acad??mico o profesional, desde lo b??sico:</p>
                                <ol className="abc">
                                    <li>Nombre y apellido.</li>
                                    <li>Carrera y campo de especializaci??n.</li>
                                </ol>
                            </FlipCard>
                            <FlipCard key={1} title={'Breve descripci??n de lo que haces'} pic={picFile2}>
                                <ol className="abc">
                                    <li>Puesto laboral m??s reciente y una muy breve descripci??n de las responsabilidades que cumpliste.</li>
                                    <li>En caso de no contar con experiencia laboral, presenta un proyecto acad??mico o de investigaci??n que hayas realizado, ??qu?? necesidad atendi??? o ??qu?? problema solucion??? Enf??cate en lo que aportaste desde tu rol, no solamente en los logros del equipo.</li>
                                </ol>
                            </FlipCard>
                            <FlipCard key={2} title={'??Por qu?? deber??an elegirte?'} pic={picFile3}>
                                <ol className="abc">
                                    <li>Conc??ntrate en responder la siguiente pregunta: ??qu?? te hace diferente?</li>
                                    <li>Brinda una respuesta clara y objetiva del por qu?? deben elegirte sobre otros profesionales que hacen lo mismo que t??.</li>
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
