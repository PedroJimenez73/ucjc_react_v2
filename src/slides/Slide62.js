import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import {pages} from '../App';
import rangy from "rangy/lib/rangy-core.js";
import "rangy/lib/rangy-highlighter";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-textrange";
import "rangy/lib/rangy-serializer";
import Titles from '../components/Titles';
import VideoNote from '../components/VideoNote';
import picFile from '../img/videofake.svg';

class Slide extends Component {

    constructor() {
        super()
        rangy.init();
        this.highlighter = rangy.createHighlighter();
        autoBind(this);
        this.state = {
            videoHeight: 0
        }
    }

    componentDidMount() {
        this.getData();
        const videoWidth = document.getElementById('video').offsetWidth;
        const newVideoHeight = videoWidth * 0.5625 + 'px';
        this.setState({videoHeight: newVideoHeight})

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

        const image = {
            src: picFile,
            alt: 'imagen',
        };

        return (
            <div className="slide back">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="flex">
                    <div className="col-100">
                        <p>
                            Para entender en profundidad cómo funciona la plataforma Doctor CV, contamos con Giancarlo Raicovi, CEO de Doctor CV. 
                        </p>    
                        <p>
                            ¡Escuchemos!      
                        </p>                        
                    </div>
                </div>
                <div className="flex">
                    <div className="col-60" id="video">
                        <img src={image.src} alt={image.alt} />
                        {/* <iframe width="100%" height={this.state.videoHeight} src="https://www.youtube.com/embed/DC9pAFnmiWY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    </div>
                    <div className="col-40">
                        <VideoNote title={pages[currentPage - 1].title} videoNumber={currentPage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
