import React, { Component } from 'react'
import autoBind from 'react-autobind';
import 'react-slidedown/lib/slidedown.css';
import question from '../img/icons/question.svg';
import parse from 'html-react-parser';

class AutoEvaluation extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: []
        }
    }

    componentDidMount() {
        let newOpenState = [];
        this.props.questions.forEach(elem => {
            newOpenState.push(false);
        })
        this.setState({open: newOpenState})
    }
    
    render() {
        const handleQuestion = (e) => {
            let newOpenState = this.state.open;
            newOpenState = newOpenState.map((elem, i) => {
                if(e === i) {
                    return true;
                } else {
                    return false
                }
            });
            this.setState({open: newOpenState})
        }
        return (
            <section className="auto-evaluation">
                <img className="question-img" src={ question } alt="Interrogación"/>
                { this.props.questions.map((question, i) => {
                    return (
                        <div className="question-text">
                            <label>
                                <input name="question" type="radio" onClick={() => handleQuestion(i)}/>
                                {parse(this.props.questions[i])}
                            </label>
                        </div>
                    )
                })}
                { this.props.feedback.map((feedback, i) => {
                    return (
                        <>
                        {this.state.open[i] ? <div className={ feedback.correct ? 'answer-content success' : 'answer-content danger'}>
                            <p>{parse(feedback.text)}</p>
                        </div>: null}
                        </>
                    )
                })}
            </section> 
        )
    }
}

export default AutoEvaluation;
