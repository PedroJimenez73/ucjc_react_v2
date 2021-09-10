import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import {pages} from '../App';
import Titles from '../components/Titles';
import GlossaryPage from '../components/GlossaryPage';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide full glossary">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={false}
                        />
                <GlossaryPage />
            </div>
        )
    }
}

export default withScorm()(Slide);

