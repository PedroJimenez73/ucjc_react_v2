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
import picFile from '../img/pic8.jpg';
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

        const image = {
            src: picFile,
            alt: 'imagen',
            footText: 'Recuperado de <a href="https://pixabay.com/es/" target="_blank" rel="noreferrer">Pixabay.com</a>'
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Pie de imagen'}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-50 left-container">
                        <div className="pic-footer-wrapper">
                            <div className="parent">
                                <div>
                                    <img src={image.src} alt={image.alt} />
                                </div>
                                <div>
                                    <p className="pic-footer">{parse(image.footText)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-50 right-container">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic itaque, dolor dolorem laboriosam ipsum praesentium doloremque qui, placeat est eaque dolore omnis.</p>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic itaque, dolor dolorem laboriosam ipsum praesentium doloremque qui, placeat est eaque dolore omnis.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
