import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import Accordion from '../components/Accordion';
import AccordionArticle from '../components/AccordionArticle';
import JumboModal from '../components/JumboModal';
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
                        <p>A continuación, realizaremos una explicación de los <b>6 segmentos básicos</b> que conforman un CV y te brindaremos algunas <b>recomendaciones </b>para mejorar la estructura y contenido.</p>
                        <Accordion>
                            <AccordionArticle title={'Encabezado'}>

                                <p>En el encabezado de tu CV debes colocar: Nombre y apellido, número de celular y/o teléfono fijo, un correo electrónico formal y el URL de tu perfil de LinkedIn.</p>

                                <p>Revisa bien que todos estos datos estén correctamente escritos. Te recomendamos no colocar foto ni dirección de domicilio u otros datos personales como estado civil, edad, etc.</p>
                            </AccordionArticle>
                            <AccordionArticle title={'Resumen profesional'}>

                                <p>Redacta un resumen profesional utilizando de 3 a 5 líneas, debajo del encabezado. En este segmento es importante mencionar brevemente la carrera que estudias o estudiaste, tu especialidad y méritos (p. ej. Pertenecer al tercio o quinto superior).</p>

                                <p>Menciona brevemente tu <b>experiencia</b>, los conocimientos técnicos que domines y estudios complementarios como idiomas, herramientas tecnológicas (p. ej. Inglés avanzado TOELF Score 102, Excel avanzado, Java, C++, AutoCAD avanzado, etc.) También es importante colocar tus intereses profesionales o más específicamente, las áreas en las que te interesa desarrollarte (P. ej. Operaciones, Logística, Diseño, Mantenimiento, Producción, Comercialización, Desarrollo, entre otros).</p>

                                <p>Procura siempre <b>incluir </b><GlossaryModal term={'Palabras clave'} text={'palabras claves'} color={'#00BFFF'} /> <b> de acuerdo a la posición a la que postulas</b>, por ejemplo, si la posición requiere el conocimiento de programación o de un ERP, mencionar: dominio de Java, Phyton o conocimientos de SAP u Oracle a nivel avanzado.</p>

                                <p><b>Las palabras clave generalmente las encuentras en la publicación de una oferta laboral.</b></p>

                            </AccordionArticle>
                            <AccordionArticle title={'Desarrollo de Proyectos o Experiencia laboral'}>
                                <p>Si no cuentas con experiencia de prácticas o empleo, detalla la experiencia que hayas ganado en el desarrollo de proyectos académicos o de investigación. De preferencia, menciona los que has realizado en los últimos dos años dentro de la universidad. Indica el nombre del proyecto, período, objetivo y logro.</p>

                                <JumboModal buttonText={'¿Cómo identificar logros y redactarlos en un CV?'}>
                                    <p>El primer paso es elaborar la lista de <b>proyectos </b>que has realizado y ordenarlos en <b>orden cronológico inverso</b>, identifica los objetivos y luego desagrega cada uno de estos en las actividades que involucraron y repásalas detalladamente. Considera lo siguiente:</p>

                                    <ul className="regular">
                                        <li>Para redactar tus logros, debes utilizar verbos de acción.</li>
                                        <li>Valida cuál fue el objetivo del proyecto que desarrollaste y cuáles fueron los resultados para que puedas plasmar realmente lo más importante.</li>
                                        <li>Haz una lista de todas las <b>funciones</b> que has desempeñado. Solo a partir de ellas puedes identificar los logros.</li>
                                        <li>Inés Temple (presidenta de Lee Hecht Harrison LHH-DBM Perú y LHH Chile) recomienda usar el <b>método PAR: Problema, Acción, Resultados</b>. “El medir nuestros resultados nos dará credibilidad, hará que las personas respeten nuestro trabajo, y le dará profesionalismo y seriedad a nuestro perfil”, indicó (Inés Temple para LHH, 2019). Es más fácil presentar los resultados de tus proyectos si hay algún dato numérico que pueda ayudar a sustentar los objetivos alcanzados.</li>
                                        <li>Es importante que logres <b>cuantificar las metas alcanzadas</b> (utilizar cifras). Puedes utilizar <b>indicadores</b> relacionados a mejora de procesos, ahorro de tiempo, reducción de costos, medidas que hayas implementado, mejoras que se hayan alcanzado gracias a tus aportes, eficiencia en el cumplimiento de fechas de entrega, etc.</li>
                                        <li>Una vez que has identificado tus logros, no olvides ser conciso, colocar 1 o 2.</li>
                                        <li>No te sientas presionado a encontrar solamente resultados extraordinarios, se trata de identificar hechos que pongan de manifiesto tus habilidades, conocimientos y tu potencial para resolver los problemas cotidianos en las labores que has realizado.</li>
                                    </ul>
                                </JumboModal>
                            </AccordionArticle>
                            <AccordionArticle title={'Formación Académica'}>

                                <p>En esta sección incluye <b>información actualizada sobre tu educación superior</b>. Coloca el nombre de la universidad, carrera, ciclo o año académico y tus méritos (p. ej. pertenecer al tercio superior).</p>

                            </AccordionArticle>
                            <AccordionArticle title={'Conocimientos Complementarios'}>
                                <p>En este segmento incluye <b>conocimientos extracurriculares</b>. Puedes listar conocimientos sobre programas de informática e idiomas indicando el nivel alcanzado (básico, intermedio, avanzado). También puedes incluir cursos de formación que se vinculen con tu carrera. Usa el <b>orden cronológico inverso</b> (de lo más reciente a los más antiguo) y de preferencia incluye conocimientos que hayas adquirido en los últimos 3 años.</p>

                            </AccordionArticle>
                            <AccordionArticle title={'Otras actividades o información adicional'}>
                                <p>Por último, refuerza el contenido de tu CV colocando <b>información adicional que potencie tu perfil </b>y refleje tus habilidades e intereses. Puedes mencionar la participación en actividades extracurriculares en organizaciones estudiantiles, concursos, voluntariados y actividades deportivas destacadas, entre otros.</p>

                            </AccordionArticle>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);





