import React, { Component } from 'react'
import parse from 'html-react-parser';
import plus from '../img/icons/plus.svg';
import minus from '../img/icons/minus.svg';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css';

class AccordionArticle extends Component {
    
    render() {
        return (
            <article className={this.props.open ? "open" : ""} key={this.props.index}>
                <div className="accordion-title" onClick={() => this.props.handleAccordion(this.props.index)}>
                    <span>{parse(this.props.title)}</span>
                    <img className="plus" src={plus} alt="" />
                    <img className="minus" src={minus} alt="" />
                </div>
                <SlideDown className={'my-dropdown-slidedown'}>
                    {this.props.open ? <div className="accordion-content">
                        {this.props.children}
                    </div>: null}
                </SlideDown>
            </article>
        )
    }
}

export default AccordionArticle
