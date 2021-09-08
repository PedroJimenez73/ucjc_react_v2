import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';
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
        const {currentPage, cmiDataState} = this.props.sco;

        if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
            this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
        }

    }

    render() {
        const {currentPage, deleteHighlight, setHighlight} = this.props.sco;

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
                        showHighLightButtons={false}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="flex">
                    <div className="col-100">
                        <ul className="regular">
                            <li><i>Business Model Canvas para Strategyzer</i> (2020). Recuperado de <a target="_blank" rel="noreferrer"   href="https://www.strategyzer.com/canvas/business-model-canvas">https://www.strategyzer.com/canvas/business-model-canvas</a></li>
                            <li>Canepa, P., & Merino, P. (2020). <i>El futuro del Trabajo. Guía ágil para tu reinvención profesional </i>(1.a ed., Vol. 1). Penguin Random House. Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/y7mxmq">https://rb.gy/y7mxmq</a></li>
                            <li>Doctor CV<i>, Los Secretos para redactar tu primer CV si no tienes Experiencia Laboral </i>(2019). Recuperado de <a target="_blank" rel="noreferrer"   href="https://blog.doctor-cv.com/experiencia/">https://blog.doctor-cv.com/experiencia/</a></li>
                            <li>Harrison, L.H.<i> Build your online brand</i> (2020). Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/qapumi">https://rb.gy/qapumi</a></li>
                            <li>Innes, J. (2012). <i>The CV Book: Your definitive guide to writing the perfect CV.</i> Pearson; Rogers, J. (2011). Great answers to tough CV problems. Kogan Page.</li>
                            <li>Jolda, L. (2020) <i>LinkedIn para LinkedIn Rock Your Profile!</i> Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/dfrl1g">https://rb.gy/dfrl1g</a></li>
                            <li>Krowdy (2019) <i>Embudo de reclutamiento</i> Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/0tjyjp">https://rb.gy/0tjyjp</a></li>
                            <li>Leifman, H., Lerner, M., & The Staff at Vault (2009). <i>Resumes, Cover Letters & Interviews</i>. United States of America: Vault.</li>
                            <li>Page, M. (2020) <i>Cómo prepararse para una entrevista de trabajo</i>. Recuperado de <a target="_blank" rel="noreferrer"   href="https://www.michaelpage.es/advice/candidatos/una-entrevista-de-%C3%A9xito/c%C3%B3mo-prepararse-para-una-entrevista-de-trabajo">https://www.michaelpage.es/advice/candidatos/una-entrevista-de-%C3%A9xito/c%C3%B3mo-prepararse-para-una-entrevista-de-trabajo</a></li>
                            <li>Page, M. <i>¿Por qué es importante el Networking? </i>(2019). Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/qe5w9m">https://rb.gy/qe5w9m</a></li>
                            <li>Page<i>,</i> M.<i> La importancia del Networking </i>(2020). Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/fktgab">https://rb.gy/fktgab</a></li>
                            <li>Perez Ortega, Andrés para Romero Abreu, <i>Tres problemas de tu Marca Personal y una solución útil para ti </i>(2015). Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/4fyluq">https://rb.gy/4fyluq</a></li>
                            <li>Temple, I. (2015). <i>Usted S.A.</i> (1.a ed.). Editorial Planeta Perú S.A.</li>
                            <li>Temple, I. para LHH,  <i>¿Cómo registrar nuestros logros y resultados en el trabajo?</i> (2019). Recuperado de <a target="_blank" rel="noreferrer"   href="https://rb.gy/9acxln">https://rb.gy/9acxln</a></li>
                            <li>UTEC Career Services, <i>Recomendaciones para organizarte antes de buscar trabajo</i> (2020).</li>
                            <li>Vardan, V. (2020) <i>85% of job success comes from having these skills</i>  Recuperado de <a target="_blank" rel="noreferrer"   href="https://www.linkedin.com/pulse/85-job-success-comes-from-having-skills-vishnu-vardhan-/">85% of job success comes from having these skills (linkedin.com)</a></li>
                            <li>World Economic Forum, <i>Cinco cosas que debe saber acerca del futuro de los puestos de trabajo.</i> Recuperado de <a target="_blank" rel="noreferrer"   href="http://shorturl.at/dEZ35">shorturl.at/dEZ35</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
