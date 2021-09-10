import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import VideoNote from '../components/VideoNote';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={''}
                        showHighLightButtons={false}
                        showPostItButton={false}
                        />
                <div className="row">
                    <div className="col-60">
                        <iframe title={'video'} src="https://player.vimeo.com/video/578374087" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>
                    <div className="col-40">
                        <VideoNote title={pages[currentPage - 1].title} videoNumber={currentPage} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
