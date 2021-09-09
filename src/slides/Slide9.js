// import React, { Component } from 'react'
// import autoBind from 'react-autobind';
// import withScorm from '../services/withScorm';
// import { pages } from '../App';
// import rangy from "rangy/lib/rangy-core.js";
// import "rangy/lib/rangy-highlighter";
// import "rangy/lib/rangy-classapplier";
// import "rangy/lib/rangy-textrange";
// import "rangy/lib/rangy-serializer";
// import Titles from '../components/Titles';
// import Quote from '../components/Quote';
// import Link from '../components/Link';

// class Slide extends Component {

//     constructor() {
//         super()
//         rangy.init();
//         this.highlighter = rangy.createHighlighter();
//         autoBind(this);
//     }

//     componentDidMount() {
//         this.getData();
//     }

//     getData() {
//         const {currentPage, cmiDataState} = this.props.sco;
//         setTimeout(()=> {
//             if (cmiDataState.highLightPagesData && cmiDataState.highLightPagesData[currentPage - 1] !== '') {
//                 this.highlighter.deserialize(cmiDataState.highLightPagesData[currentPage - 1]);
//             }
//         }, 500)

//     }

//     render() {
//         const {currentPage, deleteHighlight, setHighlight} = this.props.sco;

//         this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
//             ignoreWhiteSpace: true,
//             tagNames: ["span", "a", "b", "li"]
//         }));

//         const handleHiglight = () => {
//             deleteHighlight(currentPage - 1);
//             this.highlighter.highlightSelection("highlight");
//             const serializedHighlights = this.highlighter.serialize();
//             setHighlight(currentPage - 1, serializedHighlights)
//         }

//         const handleErase = () => {
//             this.highlighter.removeAllHighlights()
//             const elems = document.getElementsByClassName('highlight');
//             if(elems.length > 0) {
//                 console.log('rangy bug');
//                 for(let i = 0; i < elems.length; i++) {
//                     elems[i].classList.remove('highlight');
//                 }
//             }
//             deleteHighlight(currentPage - 1);
//         }

//         return (
//             <div className="slide back">
//                 <Titles title={pages[currentPage - 1].title}
//                         subtitle={'Textos destacados'}
//                         showHighLightButtons={true}
//                         showPostItButton={true}
//                         handleHiglight={handleHiglight}
//                         handleErase={handleErase}
//                         />
//                 <div className="row">
//                     <div className="col-50 left-container">
//                         <p>Lorem ipsum dolor sit amet consectetur <b>adipisicing elit</b>. Voluptates magnam ea minus quidem sunt ex molestias provident ullam saepe veritatis!</p>
//                         <div className="super-text">
//                             <p className="center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
//                         </div>
//                         <p>Lorem ipsum dolor sit amet consectetur <b>adipisicing elit</b>. Voluptates magnam ea minus quidem sunt ex molestias provident ullam saepe veritatis!</p>
//                     </div>
//                     <div className="col-50 right-container">
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default withScorm()(Slide);


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
import picFile from '../img/pic5.jpg';

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
            footText: ''
        };

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Texto destacado'}
                        showHighLightButtons={true}
                        showPostItButton={true}
                        handleHiglight={handleHiglight}
                        handleErase={handleErase}
                        />
                <div className="row" id="selectable">
                    <div className="col-50 left-container">
                        <p>Lorem ipsum dolor sit amet consectetur <b>adipisicing elit</b>. Voluptates magnam ea minus quidem sunt ex molestias provident ullam saepe veritatis!</p>
                        <div className="super-text">
                            <p className="center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur <b>adipisicing elit</b>. Voluptates magnam ea minus quidem sunt ex molestias provident ullam saepe veritatis!</p>
                    </div>
                    <div className="col-50 right-container">
                        <img src={image.src} alt={image.alt} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
