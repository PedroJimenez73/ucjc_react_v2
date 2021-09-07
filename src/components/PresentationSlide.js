import React, { Component } from 'react'

class PresentationSlide extends Component {
    
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
