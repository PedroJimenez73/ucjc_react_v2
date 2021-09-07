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
import picFile from '../img/RLE_M3_24.jpg';

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
            footText: 'Infografía LinkedIn. Recuperado de UTEC Career Services.'
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
                        <p><b>LinkedIn</b></p>

                        <p>LinkedIn es la <b>red social profesional más grande del mundo</b>. Esta red, es el punto de encuentro entre profesionales y reclutadores y es un gran apoyo para generar una potente red de contactos.</p>

                        <p><b>Es imprescindible que tengas una cuenta en LinkedIn y que la vayas actualizando paralelamente a tu CV</b>. La gran ventaja de LinkedIn es que puedes hacerte presente con las personas que forman parte de tus contactos cada vez que haces alguna actualización, por lo que debes tener siempre activado la opción de “compartir con tu red” las actualizaciones de tu perfil.</p>

                        <p>Si aún no cuentas con un perfil dentro de esta red o deseas potenciar el que ya tienes, te recomendamos lo siguiente:</p>
                    </div>
                    <div className="col-50 pic-container-right fade-in-delayed">
                        <img style={{margin: '0 auto', display: 'block'}} src={image.src} alt={image.alt} />
                        <p className="pic-footer">{image.footText}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);