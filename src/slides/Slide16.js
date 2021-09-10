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
import VerticalTable from '../components/VerticalTable';
import VerticalTableContent from '../components/VerticalTableContent';

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

        const titles = [
            'Lorem <i>ipsum</i> dolor',
            'Consectetur adipisicing elit',
            'Eos inventore iste'
        ]

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
                    <div className="col-100">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos inventore iste soluta pariatur voluptas itaque aliquid perspiciatis? Reiciendis quia culpa modi exercitationem delectus excepturi itaque iusto quibusdam, sapiente dicta tempora facere quo ea, doloremque, nemo dolore cumque praesentium molestiae repudiandae!</p>
                        <VerticalTable titles={titles}>
                            <VerticalTableContent>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem assumenda tenetur consequuntur nam temporibus explicabo voluptas quam mollitia, est libero!</p>
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                    <li>Lorem ipsum dolor sit amet consectetur</li>
                                </ul> 
                            </VerticalTableContent>
                            <VerticalTableContent>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequatur expedita suscipit!</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequatur expedita suscipit!</p>
                            </VerticalTableContent>
                        </VerticalTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
