import React, { Component } from 'react'
import autoBind from 'react-autobind';

class PresentationSlide extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return (
            <div ref={(ref) => { this.props.slidesRef[this.props.index] = ref; return true; }}
                 className="presentation-slide open">
                 {this.props.children}
            </div>
        )
    }
}

export default PresentationSlide;
