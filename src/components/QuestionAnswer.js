import React, { Component } from 'react'
import autoBind from 'react-autobind';
import parse from 'html-react-parser';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css';
import question from '../img/icons/question.svg';

class QuestionAnswer extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
    }
    
    render() {
        const handleQuestion = () => {
            this.setState({open: !this.state.open})
        }
        return (
                <section className="question-answer">
                    <img className="question-img" src={ question } alt="Interrogación"/>
                    <article className={this.state.open ? "open" : ""}>
                        <div className="question-text" onClick={() => handleQuestion()}>
                            <span>{parse(this.props.questionText)}</span>
                            <button style={{borderRadius: '0px'}}>
                                {this.state.open ? "Ocultar respuesta" : "Ver respuesta"}
                            </button>
                        </div>
                        <SlideDown className={'my-dropdown-slidedown'}>
                            {
                                this.state.open 
                            ? 
                                <div className="answer-content">
                                    {this.props.children}
                                </div>
                            : 
                                null
                            }
                        </SlideDown>
                    </article>
                </section> 
        )
    }
}

export default QuestionAnswer
