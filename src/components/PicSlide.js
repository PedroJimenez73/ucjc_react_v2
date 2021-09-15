import React, { Component } from 'react'

class PicSlide extends Component {
    
    render() {
        return (
            <> 
                {this.props.open ? 
                    <div>
                        {this.props.children}
                    </div>
                : ''}
            </>
        )
    }
}

export default PicSlide;
