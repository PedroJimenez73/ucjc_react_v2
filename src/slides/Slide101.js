import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../scormServices/withScorm';
import {pages} from '../App';
import Titles from '../components/Titles';
import Evaluation from '../components/Evaluation';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide back">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showButtons={false}/>
                <div className="flex">
                    <div className="col-100">
                       <Evaluation />
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
