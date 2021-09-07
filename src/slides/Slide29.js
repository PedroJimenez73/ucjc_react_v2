import React, { Component } from 'react';
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Quote from '../components/Quote';
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
                        <p>Asimismo, en el momento de elaborar un plan de búsqueda, te sugerimos considerar la <b>multicanalidad</b>, es decir, considerar todo los canales en los que debes estar presente -digitalmente- que te ayudarán a llegar a la misma oferta laboral y hacer efectiva tu postulación.</p>
                        <Quote text={'Los candidatos no pasan su tiempo en un único medio o canal, por ello es importante estar presente en la mayoría de estos para potenciar nuestro acercamiento a la empresa.'}
                            author={'(Krowdy, 2019)'} />
                        <p className="m-t">Algunos de los canales que te permitirán acceder a una mayor cantidad de oportunidades son los siguientes:</p>

                        <ul className="regular tempor">
                            <li>Portal Laboral de UTEC, Conecto: <a target="_blank" rel="noreferrer" href="https://conecto.utec.edu.pe/">https://conecto.utec.edu.pe/</a></li>
                            <li>Páginas web de empresas de tu elección (sección<i> Trabaja con nosotros</i>).</li>
                            <li>Portales de empleo más utilizados como: Bumeran, Indeed, BuscoJobs, etc.</li>
                            <li>LinkedIn, como la red de contacto profesional más destacada.</li>
                            <li>Redes sociales como Facebook o Instagram.</li>
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
