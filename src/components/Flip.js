import React, { Component } from 'react'
import autoBind from 'react-autobind';
import i18n from '../services/translations/i18n';

class Flip extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: []
        }
    }

    componentDidMount() {
        let newOpenState = this.state.open;
        this.props.children.forEach(() => {newOpenState.push(false)})
        this.setState({open: newOpenState});
    }

    render() {
        const handleFlip = (index) => {
            let newOpenState = this.state.open;
            newOpenState[index] = !newOpenState[index];
            this.setState({open: newOpenState})
        }
        return (
            <div>
                <p className="instructions">{i18n.t('flipCardsInstructions')}</p>
                <div className="flips-container">
                    {this.props.children.map((child, i) => {
                        return React.cloneElement(child, {index: i, open: this.state.open[i], handleFlip});
                        }                            
                    )}
                </div>
            </div>
        )
    }
}

export default Flip;
