import React, { Component } from 'react'
import autoBind from 'react-autobind';
import parse from 'html-react-parser';

class FlipCard extends Component {
    constructor() {
        super()
        autoBind(this);
    }

    render() {

        return (
                <div className={this.props.open ? "flip-card turn" : "flip-card"} 
                     onClick={() => this.props.handleFlip(this.props.index)}
                     key={this.props.index}>
                    <div className="front-card">
                        <img src={this.props.pic} alt={'imagen'} />
                        <p>
                            {parse(this.props.title)}
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
