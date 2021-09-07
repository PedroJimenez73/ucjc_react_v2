import React, { Component } from 'react'
import autoBind from 'react-autobind';

class Tree extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            showInstructions: false
        }
    }

    componentDidMount() {
        if (window.innerWidth < this.props.minWidth) {
            this.setState({showInstructions: true});
        } 
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        if (window.innerWidth < this.props.minWidth) {
            this.setState({showInstructions: true});
        } else {
            this.setState({showInstructions: false});
        }
    }

    render() {

        return (
            <>
                {this.state.showInstructions ? <p className="instructions">Desplácese con el cursor sobre el mapa para visualizarlo completamente</p> : ''}
                <div className="tree">
                    <div style={{minWidth: this.props.minWidth + 'px'}}>
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}

export default Tree;