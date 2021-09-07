import React, { Component } from 'react'
import autoBind from 'react-autobind';

class FlipCard extends Component {
    constructor() {
        super()
        autoBind(this);
    }

    render() {

        return (
                <div className={this.props.open ? "flip-card turn" : "flip-card"} 
                     onClick={() => this.props.handleFlip(this.props.index)}>
                    <div className="front-card">
                        <img src={this.props.pic} alt={'imagen'} />
                        <p className="orange-text">
                            {this.props.title}
                        </p>
                    </div>
                    <div className="back-card">
                        {this.props.children}
                    </div>
                </div>       
        )
    }
}

export default FlipCard;
