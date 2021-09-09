import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import Titles from '../components/Titles';
import PicCarousel from '../components/PicCarousel';
import PicSlide from '../components/PicSlide';
import picFile1 from '../img/pic1.jpg';
import picFile2 from '../img/pic2.jpg';
import picFile3 from '../img/pic3.jpg';
import picFile4 from '../img/pic4.jpg';
import parse from 'html-react-parser';

class Slide extends Component {

    constructor() {
        super()
        rangy.init();
        this.highlighter = rangy.createHighlighter();
        autoBind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const {currentPage, cmiDataState} = this.props.sco;
        setTimeout(()=> {
            if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
                this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
            }
        }, 500)
    }

    render() {
        const {currentPage, deleteHighlight, setHighlight} = this.props.sco;

        this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a", "li"]
        }));

        const handleHiglight = () => {
            deleteHighlight(currentPage - 1);
            this.highlighter.highlightSelection("highlight", {containerElementId: 'selectable'});
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

        const image1 = {
            src: picFile1,
            alt: 'imagen',
            footText: 'Lorem ipsum dolor, sit amet consectetur'
        };
        const image2 = {
            src: picFile2,
            alt: 'imagen',
            footText: 'Hic itaque, dolor dolorem laboriosam'
        };
        const image3 = {
            src: picFile3,
            alt: 'imagen',
            footText: 'Placeat est eaque dolore omnis'
        };
        const image4 = {
            src: picFile4,
            alt: 'imagen',
            footText: 'Lorem ipsum dolor, sit amet consectetur'
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Carrusel de imágenes'}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-50 left-container">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic itaque, dolor dolorem laboriosam ipsum praesentium doloremque qui, placeat est eaque dolore omnis.</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic itaque, dolor dolorem laboriosam ipsum praesentium doloremque qui, placeat est eaque dolore omnis.</p>                   
                    </div>
                    <div className="col-50 right-container">
                        <PicCarousel>
                            <PicSlide>
                                <img className="carousel-pic" src={image1.src} alt={image1.alt} /> 
                                <p className="pic-footer">{parse(image1.footText)}</p>
                            </PicSlide>
                            <PicSlide>
                                <img className="carousel-pic" src={image2.src} alt={image2.alt} /> 
                                <p className="pic-footer">{parse(image2.footText)}</p>
                            </PicSlide>
                            <PicSlide>
                                <img className="carousel-pic" src={image3.src} alt={image3.alt} /> 
                                <p className="pic-footer">{parse(image3.footText)}</p>
                            </PicSlide>
                            <PicSlide>
                                <img className="carousel-pic" src={image4.src} alt={image4.alt} /> 
                                <p className="pic-footer">{parse(image4.footText)}</p>
                            </PicSlide>
                        </PicCarousel>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
