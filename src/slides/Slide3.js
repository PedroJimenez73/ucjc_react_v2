import React, { Component } from 'react';
import withScorm from '../scormServices/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Tree from '../components/Tree';


class Slide extends Component {

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        />
                <Tree minWidth={1800}>
                     <ul>
                        <li>
                            <p className="fade-in tree-item tree-item-level1">Introducción a la Empleabilidad</p>
                            <ul>
                                <li className="fade-in-delayed">
                                    <p className="tree-item tree-item-level2">Marketing personal</p>
                                    <ul>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Define tu marca personal</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Construye una estrategia de marketing profesional</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Prepara un <i>pitch</i> personal</p>
                                        </li>
                                    </ul>
                                </li>
                                <li className="fade-in-delayed">
                                    <p className="tree-item tree-item-level2">Herramientas para la búsqueda de prácticas o empleo</p>
                                    <ul>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Elaborar un plan de búsqueda de oportunidades laborales</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Currículum Vitae</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">LinkedIn como herramienta de <i>Networking</i></p>
                                        </li>
                                    </ul>
                                </li>
                                <li className="fade-in-delayed">
                                    <p className="tree-item tree-item-level2">La entrevista laboral en un proceso de selección</p>
                                    <ul>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">El proceso de selección</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">La entrevista laboral</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Tipos de entrevistas laborales</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Preguntas y respuestas en una entrevista laboral</p>
                                        </li>
                                        <li className="fade-in-delayed-2">
                                            <p className="tree-item tree-item-level3">Método STAR</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Tree>
            </div>
        )
    }
}

export default withScorm()(Slide);


