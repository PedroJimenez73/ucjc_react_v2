import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import {pages} from '../App';
import Titles from '../components/Titles';
import Tree from '../components/Tree';

class Slide extends Component {

    render() {
        const {currentPage} = this.props.sco;
        
        return (
            <div className="slide back">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        />
                <Tree />
            </div>
        )
    }
}

export default withScorm()(Slide);
