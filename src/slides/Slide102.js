import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import { pages } from '../App';
import Titles from '../components/Titles';

class Slide extends Component {
    constructor() {
        super()
        autoBind(this);
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        this.getData()
    }

    getData() {

    }

    render() {
        const { currentPage } = this.props.sco;
        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={false}
                        />
                <div className="flex">
                    <div className="col-100">

                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
