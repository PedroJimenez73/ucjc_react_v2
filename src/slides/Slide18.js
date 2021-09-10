import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import Timeline from '../components/Timeline';
import TimelineArticle from '../components/TimelineArticle';
import picFile1 from '../img/bell.jpg';
import picFile2 from '../img/compu.jpg';
import picFile3 from '../img/tcp.png';
import picFile4 from '../img/int1.jpg';
class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;

        const image1 = {
            src: picFile1,
            style: {width: '160px', display: 'block', margin: '0 auto'},
            alt: ''
        }
        const image2 = {
            src: picFile2,
            style: {width: '260px', display: 'block', margin: '0 auto'},
            alt: ''
        }
        const image3 = {
            src: picFile3,
            style: {width: '160px', display: 'block', margin: '0 auto'},
            alt: ''
        }
        const image4 = {
            src: picFile4,
            style: {width: '310px', display: 'block', margin: '0 auto'},
            alt: ''
        }
        
        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={true}
                        />
                <div className="row" id="selectable">
                    <div className="col-100">
                        <Timeline>
                            <TimelineArticle title={'1958'}>
                                <div className="flex j-center a-center">
                                    <div className="col-50 left-container">
                                        <p>La compañía BELL crea el primer módem que permitía transmitir datos binarios sobre una línea telefónica simple.</p>
                                    </div>
                                    <div className="col-50 right-container">
                                        <img style={image1.style} src={image1.src} alt={image1.alt} />
                                    </div>
                                </div>
                            </TimelineArticle>
                            <TimelineArticle title={'1969'}>
                                <div className="flex j-center a-center">
                                    <div className="col-50 left-container">
                                        <p>Conexión de las primeras computadoras entre 4 universidades estadounidenses a través de la <i>Interface Message Processor</i> de Leonard Kleinrock.</p>
                                    </div>
                                    <div className="col-50 right-container">
                                        <img style={image2.style} src={image2.src} alt={image2.alt} />
                                    </div>
                                </div>
                            </TimelineArticle>
                            <TimelineArticle title={'1981'}>
                                <div className="flex j-center a-center">
                                    <div className="col-50 left-container">
                                        <p>Definición del protocolo TCP/IP y de la palabra «Internet».</p>
                                    </div>
                                    <div className="col-50 right-container">
                                        <img style={image3.style} src={image3.src} alt={image3.alt} />
                                    </div>
                                </div>
                            </TimelineArticle>
                            <TimelineArticle title={'1991'}>
                                <div className="flex j-center a-center">
                                    <div className="col-50 left-container">
                                        <p>10 millones de computadoras conectadas.</p>
                                    </div>
                                    <div className="col-50 right-container">
                                        <img style={image4.style} src={image4.src} alt={image4.alt} />
                                    </div>
                                </div>
                            </TimelineArticle>
                        </Timeline>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
