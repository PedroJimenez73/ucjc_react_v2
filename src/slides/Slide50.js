import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Timeline from '../components/Timeline';
import TimelineArticle from '../components/TimelineArticle';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_28.jpg';

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
                    <div className="col-100">
                        <p><b>¿Qué debes considerar para enfrentar con éxito una video presentación? </b></p>

                        <p>Sigue los siguientes pasos:</p>
                        <Timeline>
                            <TimelineArticle title={'1'}>
                                <p>El error más común es no prepararse adecuadamente y confiar excesivamente en nuestra capacidad de improvisación. Recuerda que <b>este tipo de entrevistas requieren la misma preparación que una entrevista virtual o presencial</b>. En este punto, te servirá mucho contar con un pitch de 30 segundos.</p>


                            </TimelineArticle>
                            <TimelineArticle title={'2'}>
                                <p><b>Prepara tu tecnología</b>. En el caso de que la empresa te pida que utilices una aplicación específica, asegúrate de actualizar tu computadora, <i>laptop</i> o celular, para que esta funcione correctamente. Realiza las pruebas respectivas con anticipación. Asimismo, prueba tu cámara, micrófono o cualquier otro dispositivo que vayas a utilizar.</p>



                            </TimelineArticle>
                            <TimelineArticle title={'3'}>
                                <p><b>Prepara tu entorno.</b> Así sean videos cortos, debes asegurarte de contar con un ambiente tranquilo y sin interrupciones para que puedas concentrarte y grabar tus respuestas con seguridad.</p>



                            </TimelineArticle>
                            <TimelineArticle title={'4'}>

                                <p><b>Lee con detenimiento las indicaciones de la app</b>. No te apresures.</p>
                            </TimelineArticle>
                            <TimelineArticle title={'5'}>

                                <p>Si la app te ofrece una prueba, ¡tómala! <b>Haz un ensayo rápido</b>, este te ayudará a identificar cosas que puedes corregir al instante: el ángulo de tu cámara, el audio, la iluminación, entre otros.</p>
                            </TimelineArticle>
                        </Timeline>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);