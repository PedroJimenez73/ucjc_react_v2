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
import picFile from '../img/pic4.jpg';
import GlossaryModal from '../components/GlossaryModal';

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

        const image = {
            src: picFile,
            alt: 'imagen',
            footText: ''
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Acceso a glosario en palabras'}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-50 left-container">
                        <img src={image.src} alt={image.alt} />
                    </div>
                    <div className="col-50 right-container">
                        <p>Lorem ipsum dolor sit, amet <b>consectetur adipisicing elit</b>. Adipisci, exercitationem. Lorem ipsum dolor sit amet consectetur.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vitae obcaecati sunt fugiat pariatur voluptas, illum quae quis, minima labore exercitationem possimus quasi porro. Tenetur placeat quibusdam quae quam dicta itaque corporis rem tempora quidem!</p>
                        <p>¿A qué nos referimos cuando hablamos de <GlossaryModal term={'Empleabilidad'} text={'empleabilidad'} color={'#84a0b4'} />? Pues, nos referimos a ser capaces de desarrollar un conjunto de habilidades que no solamente nos permitan obtener un empleo cuando lo buscamos, sino también mantenerlo y a lo largo de nuestra trayectoria conseguir mejores oportunidades de desarrollo profesional.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);

