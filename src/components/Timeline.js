import React, { Component } from 'react'
import autoBind from 'react-autobind';
import i18n from '../services/translations/i18n';

class Timeline extends Component {
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
        newOpenState[0] = true;
        this.setState({open: newOpenState});
    }

    render() {
        const handleArticle = (index) => {
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
            <>
                <p className="instructions">{i18n.t('timelineInstructions')}</p>
                <section className="timeline">
                    {this.props.children.map((child, i) => {
                        return React.cloneElement(child, {index: i, open: this.state.open[i], handleArticle});
                        }                            
                    )}
                </section> 
            </>
        )
    }
}

export default Timeline;
