import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Activity from '../components/Activity';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_02.jpg';

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
            footText: 'Tabla 1. Preguntas parte 1: Conócete y rétate. Recuperado de Career Services UTEC.'
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
                    <div className="col-50  pic-container-left">
                        <table className="activity">
                            <tr>
                                <th>1. Conócete: ¿Quién eres y cómo te diferencias? </th>
                                <th>2. Rétate: ¿Cuáles son tus objetivos? </th>
                            </tr>
                            <tr>
                                <td>¿Cuál es tu historia?</td>
                                <td>¿Qué quieres conseguir? </td>
                            </tr>
                            <tr>
                                <td>¿Cuál es tu propósito? </td>
                                <td rowSpan="2">¿En cuánto tiempo? </td>
                            </tr>
                            <tr><td>¿Qué te motiva? </td></tr>
                            <tr>
                                <td>¿Cuál son tus capacidades? </td>
                                <td rowSpan="2">¿Cuáles son tus metas académicas? </td>
                            </tr>
                            <tr><td>¿En qué temas has ganado experiencia? </td></tr>

                            <tr>
                                <td>Cuándo alguien acude a ti, ¿por qué lo hace? ¿Qué respuestas busca? ¿Sobre qué tema eres líder de opinión? </td>
                                <td>¿Cuáles son tus metas profesionales? </td>
                            </tr>
                            <tr>
                                <td>¿En qué tema puedes mejorar? </td>
                                <td>¿Para cumplir tu meta a largo plazo, qué debes conseguir en 3 meses? ¿y en 6 meses? </td>
                            </tr>
                            <tr>
                                <td>A partir de tus capacidades y fortalezas, ¿cuál es tu aporte? (valor de marca) </td>
                                <td>¿Qué de lo que haces hoy te gustaría continuar haciendo en el próximo año? </td>
                            </tr>

                            <tr>
                                <td>¿En qué medida te satisface lo que realizas? </td>
                                <td>¿Qué cosa nueva te gustaría estar haciendo en los próximos años?</td>
                            </tr>

                        </table>
                        <p className="pic-footer">{image.footText}</p>
                    </div>
                    <div className="col-50">
                        <p><b>¿Cómo puedes dar el primer paso para definir tu marca personal? </b></p>
                        <Activity>
                            <p>Partiendo del concepto de marca personal, como primer paso te sugerimos responder dos preguntas clave que te permitirán generar un autoanálisis.</p>
                            <p>Te presentamos a continuación, una lista de preguntas que te darán los lineamientos principales.</p>
                        </Activity>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
