import React, { Component } from 'react'
import autoBind from 'react-autobind';
import i18n from '../services/translations/i18n';

class Tree extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            showInstructions: false
        }
    }

    componentDidMount() {
        if ((window.innerWidth - 38) < this.props.width || this.props.width >= 1440) {
            this.setState({showInstructions: true});
        } 
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        if ((window.innerWidth - 38) < this.props.width) {
            this.setState({showInstructions: true});
        } else {
            this.setState({showInstructions: false});
        }
    }

    render() {

        return (
            <>
                {this.state.showInstructions ? <p className="instructions">{i18n.t('conceptMapInstructions')}</p> : ''}
                <div className="tree">
                    <div style={{width: this.props.width + 'px'}}>
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}

export default Tree;