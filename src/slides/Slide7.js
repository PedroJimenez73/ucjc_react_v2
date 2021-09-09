import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {

    }

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Listas temporizadas'}
                        showHighLightButtons={false}
                        showPostItButton={true}
                        />
                <div className="row">
                    <div className="col-100">
                        <p>Lorem ipsum dolor sit, amet <b>consectetur adipisicing elit</b>. Adipisci, exercitationem. Lorem ipsum dolor sit amet consectetur.</p>
                        <ol className="tempor">
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                        </ol>
                        <p className="fade-four">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, molestias.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
