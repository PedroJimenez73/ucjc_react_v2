import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import parse from 'html-react-parser';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_08.jpg';

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
            footText: 'Tabla 4. Preguntas parte 2: Investiga y conecta. Recuperado de Career Services UTEC.'
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
<p>Elabora una estrategia que involucre <b>personas clave</b>. Segmenta a tus “clientes” y todo contacto dentro de tu red de confianza que pueda ayudarte a impulsar tu marca. Si estás buscando oportunidades laborales (prácticas o empleo) define qué personas dentro de tu red de confianza deben de estar enteradas para que puedan recomendarte o validar tus capacidades.</p>

<p>Si necesitas a uno de tus contactos para tu búsqueda de empleo, debes estar dispuesto a colaborar con esa persona o con otra que lo necesite. Por supuesto, esto requiere confianza de ambas partes. Es importante contactar con personas de buena reputación (Michael Page, 2019).</p>

<p>Si estás dentro de una empresa, define quiénes deben conocer tu aporte profesional, esto puede abrirte puertas a oportunidades futuras.</p>
                    </div>
                    <div className="col-50 pic-container-right">
                        <table className="activity">
                            <tr><th>3. Investiga: ¿Quién debe saber de ti?</th> 	<th>4. Conecta: ¿Cómo llegarás a tu público objetivo? </th></tr>
<tr><td>¿Qué tipo de profesional encontrará valor en tu “producto”? </td>	<td>¿En qué plataformas debes posicionar tu marca? </td></tr>
<tr><td>¿Con qué personas que ya conozco debo fortalecer una relación?</td> 	<td>¿En qué eventos debes estar presente? </td></tr>
<tr><td>¿Qué personas nuevas del ámbito de mi especialidad me gustaría contactar? </td><td>¿Cómo puedes potenciar tu red de contactos? </td></tr>

                        </table>
                        <p className="pic-footer">{parse(image.footText)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
