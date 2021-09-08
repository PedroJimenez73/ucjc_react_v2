import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import {pages} from '../App';
import Titles from '../components/Titles';
import GlossaryPage from '../components/GlossaryPage';

class Slide extends Component {

    render() {
        const {currentPage} = this.props.sco;
        
        return (
            <div className="slide full glossary">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showButtons={false}/>
                <GlossaryPage />
            </div>
        )
    }
}

export default withScorm()(Slide);
