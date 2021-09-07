import React, { Component } from 'react'
import autoBind from 'react-autobind';
import 'react-slidedown/lib/slidedown.css';
import question from '../img/icons/question.svg';

class AutoEvaluation14 extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: []
        }
    }

    componentDidMount() {
        const articles = document.querySelectorAll('.question-text');
        let newOpenState = [];
        articles.forEach(elem => {
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
                    <div className="question-text">
                        <img className="question-img" src={ question } alt="Interrogación"/>
                        <label >
                            <input name="question" type="radio" onClick={() => handleQuestion(0)}/>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ut?
                        </label>
                    </div>
                    <div className="question-text">
                        <label >
                            <input name="question" type="radio" onClick={() => handleQuestion(1)}/>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis?
                        </label>
                    </div>
                    <div className="question-text">
                        <label >
                            <input name="question" type="radio" onClick={() => handleQuestion(2)}/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, maxime dolorum. Illum?
                        </label>
                    </div>
                    {this.state.open[0] ? <div className="answer-content danger">
                        <p>Incorrecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>: null}
                    {this.state.open[1] ? <div className="answer-content success">
                        <p>Correcto. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>: null}
                    {this.state.open[2] ? <div className="answer-content danger">
                        <p>Incorrecto. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>: null}
                </section> 
        )
    }
}

export default AutoEvaluation14
