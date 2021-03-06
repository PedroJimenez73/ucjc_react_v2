import React, { Component } from 'react';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import GlossaryModal from '../components/GlossaryModal';
import Presentation from '../components/Presentation';
import PresentationSlide from '../components/PresentationSlide';

class Slide extends Component {

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={true}/>
                <Presentation>
                    <PresentationSlide key={0}>
                        <p>¿A qué nos referimos cuando hablamos de <GlossaryModal term={'Empleabilidad'} text={'empleabilidad'} color={'#84a0b4'} />? Pues, nos referimos a ser capaces de desarrollar un conjunto de habilidades que no solamente nos permitan obtener un empleo cuando lo buscamos, sino también mantenerlo y a lo largo de nuestra trayectoria conseguir mejores oportunidades de desarrollo profesional.</p>
                        <p><b>Ser empleable implica desarrollar un alto nivel de autoconocimiento, autoanálisis y valoración de nuestras capacidades</b> (desarrollar autoestima), es decir, identificar nuestro perfil competitivo. Además, implica estar siempre preparados, construir una estrategia de marketing profesional que nos permita convertirnos en un referente activo dentro del campo laboral que elijamos, sin olvidarnos de actualizarnos constantemente para mantener el ritmo del mundo laboral, el contexto por el que atraviesa, las oportunidades que genera, etc.</p>
                    </PresentationSlide>
                    <PresentationSlide key={1}>
                        <p><b>Ser empleable implica desarrollar un alto nivel de autoconocimiento, autoanálisis y valoración de nuestras capacidades</b> (desarrollar autoestima), es decir, identificar nuestro perfil competitivo. Además, implica estar siempre preparados, construir una estrategia de marketing profesional que nos permita convertirnos en un referente activo dentro del campo laboral que elijamos, sin olvidarnos de actualizarnos constantemente para mantener el ritmo del mundo laboral, el contexto por el que atraviesa, las oportunidades que genera, etc.</p>
                    </PresentationSlide>
                    <PresentationSlide key={2}>
                        <p>Al culminar esta unidad, serás capaz de:</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, facere commodi! Possimus minus, odio repellendus, quos, quas nihil impedit animi dolorum maiores optio ipsa reprehenderit adipisci.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus iure dolor velit nesciunt molestias, sapiente corrupti dolorum nam ratione aliquam.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus iure dolor velit nesciunt molestias, sapiente corrupti dolorum nam ratione aliquam.</li>
                        </ul>                    
                    </PresentationSlide>
                </Presentation>
            </div>
        )
    }
}

export default withScorm()(Slide);