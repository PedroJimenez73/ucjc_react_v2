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
import Accordion from '../components/Accordion';
import AccordionArticle from '../components/AccordionArticle';
import picFile from '../img/pic9.jpg';
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
            footText: 'Lorem ipsum dolor, sit amet consectetur'
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-50 left-container">
                        <img src={image.src} alt={image.alt} />
                        <p className="pic-footer">{parse(image.footText)}</p>
                    </div>
                    <div className="col-50 right-container">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fuga quis ducimus nihil! Pariatur, recusandae ratione consectetur cum quisquam modi?</p>
                        <Accordion>
                            <AccordionArticle title={'Lorem ipsum'}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fuga quis ducimus nihil! Pariatur, recusandae ratione consectetur cum quisquam modi?</p>
                            </AccordionArticle>
                            <AccordionArticle title={'Dolor <i>sit amet</i>'}>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fuga quis ducimus nihil! Pariatur, recusandae ratione consectetur cum quisquam modi?</p>
                            </AccordionArticle>
                            <AccordionArticle title={'Consectetur'}>
                                <ol className="abc">
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                </ol>   
                             </AccordionArticle>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
