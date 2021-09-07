import React, { Component } from 'react'
import autoBind from 'react-autobind';

class Accordion extends Component {
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
        this.setState({open: newOpenState})
    }

    render() {
        const handleAccordion = (index) => {
            let newOpenState = this.state.open;
            newOpenState = newOpenState.map((elem, i) => {
                if(index === i) {
                    return !elem;
                } else {
                    return false
                }
            });
            this.setState({open: newOpenState})
        }
        return (
                <section className="accordion">
                    {this.props.children.map((child, i) => {
                        return React.cloneElement(child, {index: i, open: this.state.open[i], handleAccordion});
                        }                            
                    )}
                </section> 
        )
    }
}

export default Accordion;
