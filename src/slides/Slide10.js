import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import picFile from '../img/RLE_M3_03.jpg';

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
            footText: 'Tabla 2. Resumen de experiencia y talentos. Recuperado de Canepa, P., & Merino, P., 2020.'
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
                    <div className="col-40">
                        <p>Adicionalmente, puedes realizar un listado de tus talentos especiales, los que has ganado a través de la experiencia. Estos incluirán tus conocimientos, habilidades y actitudes en el ámbito de tu especialización. Haz una revisión profunda de:</p>

                        <ul className="regular tempor">
                            <li>Lo que sabes hacer: desde la teoría.</li>
                            <li>Lo que puedes hacer: desde la práctica.</li>
                            <li>Lo que quieres hacer: desde la vocación y pasión.</li>
                        </ul>

                        <p className="fade-four m-t">A continuación, te presentamos ejemplos que te ayudarán a elaborar un listado preliminar de tus experiencias más relevantes</p>

                    </div>
                    <div className="col-60 pic-container-right">
                        <table className="activity">
                            <tr><th></th><th>Experiencias que te diferencian</th> 	<th>Talentos especiales</th> </tr>
                            <tr><td style={{textAlign: 'center'}}>Experiencia 1</td> 	<td>Participación en un concurso de ideas generado por una empresa de multicines, para identificar un nuevo modelo de negocio en respuesta a la pandemia.</td>	<td rowSpan="2">TALENTO ESPECIAL 1 <br />Aportar ideas innovadoras para resolver problemas complejos con tecnología.</td></tr>
                            <tr><td>Resultado</td> 	<td>Obtención del primer puesto y reconocimiento como idea destacada.</td></tr>
                            <tr><td style={{textAlign: 'center'}}>Experiencia 2</td> 	<td>Trabajo multidisciplinario para la creación de una plataforma virtual de servicios médicos a domicilio.</td>	<td rowSpan="2">TALENTO ESPECIAL 2<br /> Identificar oportunidades de mercado que crean valor para el cliente con tecnología.</td></tr>
                            <tr><td>Resultado</td> 	<td>Reconocimiento por una idea viable en la feria de proyectos.</td></tr>
                            <tr><td style={{textAlign: 'center'}}>Experiencia 3</td> 	<td>Tomar iniciativa para generar la continuidad de una Organización Estudiantil utilizando eventos interactivos para convocar nuevos integrantes.</td>	<td rowSpan="2">TALENTO ESPECIAL 3 <br />Aportar iniciativa y proactividad para sacar adelante nuevos proyectos y generar valor en equipo.</td></tr>
                            <tr><td>Resultado</td> 	<td>Reconocimiento del líder y del profesor involucrado por las ideas presentadas.</td></tr>
                        </table>
                        <p className="pic-footer">{image.footText}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
