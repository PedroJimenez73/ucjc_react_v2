import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import {pages} from '../App';

class Slide extends Component {

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide full unit back">
                <h1 className="fade-in-small-delayed">
                    <span>{pages[currentPage - 1].item}</span>
                    <span>{pages[currentPage - 1].title}</span>
                </h1>
            </div>
        )
    }
}

export default withScorm()(Slide);
