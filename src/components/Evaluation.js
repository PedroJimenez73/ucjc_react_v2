import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import EvaluationInfo from '../data/evaluationInfo';
import icon1 from '../img/icons/check-circle.svg';
import icon2 from '../img/icons/x-circle.svg';
import parse from 'html-react-parser';
import { pages } from '../App';

class Evaluation extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            showEvaluation: false,
            userAnswers: [],
            validForm: false,
            results: [],
            corrects: 0,
            showAnswers: false,
        }
    }

    componentDidMount() {
        let newUserAnswers = [];
        EvaluationInfo.questions.forEach((elem, index) => {
            if (typeof EvaluationInfo.corrects[index] === 'object') {
                newUserAnswers.push(new Array(0));
            } else {
                newUserAnswers.push('');
            }
        })
        this.setState({userAnswers: newUserAnswers})
    }

    letters = ['a','b','c','d','e','f','g','h','i','j'];

    handleStartEvaluation = () => {
        this.setState({showEvaluation: true});
        window.scrollTo(0, 0);
    }

    onChange = (event) => {
        let newUserAnswers = this.state.userAnswers;
        if (event.target.type === 'checkbox') {
            const pos = newUserAnswers[event.target.name].indexOf(event.target.value);
            if (pos > -1) {
                newUserAnswers[event.target.name].splice(pos, 1);
            } else {
                newUserAnswers[event.target.name].push(event.target.value);
                newUserAnswers[event.target.name].sort();
            }
        } else {
            newUserAnswers[event.target.name] = event.target.value;
        }
        this.setState({userAnswers: newUserAnswers}, () => {
            let validQuestions = [];
            this.state.userAnswers.forEach((answer) => {
                if (answer === '' || JSON.stringify(answer) === JSON.stringify([])) {
                    validQuestions.push(false);
                } else {
                    validQuestions.push(true);
                }
            })
            this.setState({validForm: !validQuestions.includes(false)})
        })
    }

    setLabelClases(inputType, indexQuestion, indexOption) {
        if(inputType === 'checkbox' && this.state.showAnswers) {
            if(EvaluationInfo.corrects[indexQuestion].includes(this.letters[indexOption])) {
                return 'success';
            } else if (this.state.userAnswers[indexQuestion]?.includes(this.letters[indexOption])) {
                return 'danger';
            }
        } else if (inputType === 'radio' && this.state.showAnswers) {
            if (EvaluationInfo.corrects[indexQuestion] === this.letters[indexOption]) {
                return 'success';
            } else if(this.state.userAnswers[indexQuestion] === this.letters[indexOption] && EvaluationInfo.corrects[indexQuestion] !== this.state.userAnswers[indexQuestion]) {
                return 'danger';
            }
        }
    }

    render() {
        const {setEvaluationState, cmiDataState, navToPage} = this.props.sco;
        const setResults = () => {
            let corrects = 0;
            let results = EvaluationInfo.corrects.map((elem, index) => {
                if(JSON.stringify(elem) === JSON.stringify(this.state.userAnswers[index])) {
                    corrects++;
                    return true;
                } else {
                    return false;
                }
            })
            this.setState({results: results, corrects: corrects, showAnswers: true});
            setEvaluationState(corrects, this.state.userAnswers.length);
        }
        return (
            <>
            {
                !this.state.showEvaluation && cmiDataState.evaluationData.attemps === cmiDataState.evaluationData.maxAttemps
                ?  
                    <div className="evaluation-instructions">
                        <p>A continuación debe realizar la evaluación de esta unidad de la siguiente forma:</p> 
                        <ul>
                            <li>La evaluación consta de {this.state.userAnswers.length} preguntas con varias respuestas posibles de las cuales podrán ser correctas una o varias.</li>
                            <li>En el enunciado de las preguntas se advierte si tienen varias respuestas posibles.</li>
                            <li>Se dispone de {cmiDataState.evaluationData.attemps} intentos como máximo para realizar la evaluación, aunque estos intentos se pueden realizar en sesiones de acceso diferentes.</li>
                            <li>Para enviar los resultados será necesario contestar a todas las preguntas, en caso contrario el botón enviar no estará habilitado.</li>
                            <li>Para superar la evaluación será necesario acertar más del 50% de la prueba.</li>
                        </ul>
                        <div className="flex j-end a-center m-t">
                            <button className="outline" onClick={() => this.handleStartEvaluation()}>Comenzar</button>
                        </div>
                    </div>
                : '' 
            }
            {
                !this.state.showEvaluation && cmiDataState.evaluationData.attemps < cmiDataState.evaluationData.maxAttemps && cmiDataState.evaluationData.attemps !== 0 && cmiDataState.evaluationData.corrects / this.state.userAnswers.length < 0.5
                ?  
                    <div className="evaluation-instructions">
                        <p><b>Nuevo intento evaluación</b></p>
                        <p>A continuación debe realizar la evaluación de esta unidad de la siguiente forma:</p> 
                        <ul>
                            <li>La evaluación consta de {this.state.userAnswers.length} preguntas con varias respuestas posibles de las cuales podrán ser correctas una o varias.</li>
                            <li>En el enunciado de las preguntas se advierte si tienen varias respuestas posibles.</li>
                            <li>Se dispone de {cmiDataState.evaluationData.attemps} intentos como máximo para realizar la evaluación, aunque estos intentos se pueden realizar en sesiones de acceso diferentes.</li>
                            <li>Para enviar los resultados será necesario contestar a todas las preguntas, en caso contrario el botón enviar no estará habilitado.</li>
                            <li>Para superar la evaluación será necesario acertar más del 50% de la prueba.</li>
                        </ul>
                        {
                            cmiDataState.evaluationData.attemps === 1
                            ?
                            <p>Dispone de un último intento.</p>
                            :
                            <p>Dispone de {cmiDataState.evaluationData.attemps} intentos mas.</p>
                        }
                        <div className="flex j-end a-center m-t">
                            <button className="outline" onClick={() => this.handleStartEvaluation()}>Nuevo intento</button>
                        </div>
                    </div>
                : '' 
            }
            {
                (!this.state.showEvaluation && cmiDataState.evaluationData.attemps === 0) || (!this.state.showEvaluation && cmiDataState.evaluationData.corrects / this.state.userAnswers.length >= 0.5)
                ?  
                    <div className="evaluation-instructions">
                        {
                            cmiDataState.evaluationData.corrects / this.state.userAnswers.length >= 0.5
                            ?
                            <p className="flex j-center a-center">
                                <img className="m-r" src={icon1} alt="" />
                                Enhorabuena, superó la evaluación. La puntuación que obtuvo fue {cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}.
                            </p>
                            :
                            <p className="flex j-center a-center">
                                <img className="m-r" src={icon2} alt="" />
                                Lo sentimos, no superó la evaluación. La puntuación que obtuvo fue {cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}.
                            </p>
                        }
                    </div>
                : '' 
            }
            {
                this.state.showEvaluation
                ?
                <div className="final-evaluation">
                    {EvaluationInfo.questions.map((question, index) => {
                        const indexQuestion = index;
                        const inputType = typeof EvaluationInfo.corrects[index] === 'object' ? 'checkbox' : 'radio';
                        return <div key={index}>
                            <p>{index + 1 + '.- '}{parse(question.ennunciate)}</p>
                            {question.answers.map((answer, index) => {
                                return <label key={index} 
                                              style={{ pointerEvents: this.state.showAnswers ? 'none' : 'auto' }}
                                              className={this.setLabelClases(inputType, indexQuestion, index)}>
                                              <input type={inputType}
                                                name={indexQuestion} 
                                                value={this.letters[index]}
                                                onChange={this.onChange}/>
                                            {parse(answer)}
                                    </label>
                            })}
                            {this.state.showAnswers && question.feedback !== '' ? <p className="feedback">{parse(question.feedback)}</p> : ''}
                        </div>
                    })}
                    <div className="flex j-end a-center m-t">
                        {!this.state.validForm ? <p className="valid-text">Complete todas las preguntas</p>: null}
                        {!this.state.showAnswers ? 
                                <button disabled={!this.state.validForm} 
                                        className="outline m-l-small"
                                        onClick={() => {setResults()}}>Comprobar</button> : null}
                    </div>
                    {
                        this.state.showAnswers
                        ? 
                        <div>
                            {
                                cmiDataState.evaluationData.corrects / this.state.userAnswers.length >= 0.5
                                ?
                                <p className="success">Enhorabuena, ha superado la evaluación. La puntuación obtenida es {cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}</p>
                                : 
                                <p className="danger">Lo sentimos, no ha superado la evaluación. La puntuación obtenida es {cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}</p>
                            }
                            {
                                cmiDataState.evaluationData.attemps > 0 && cmiDataState.evaluationData.corrects / this.state.userAnswers.length < 0.5
                                ?
                                <div className="row">
                                    <div className="col-100">
                                        {
                                            cmiDataState.evaluationData.attemps === 1
                                            ?
                                            <p className="result">Dispone de 1 intento más. Repase los apartados antes de intentar de nuevo.</p>
                                            :
                                            <p className="result">Dispone de {cmiDataState.evaluationData.attemps} intentos más. Repase los apartados antes de intentar de nuevo.</p>
                                        }
                                        <p>Ha fallado las preguntas:</p>
                                        { 
                                            EvaluationInfo.questions.map((question, i) => {
                                                return (
                                                    <>
                                                        {this.state.results[i] 
                                                            ? '' : 
                                                            <p className="result">
                                                                <span>{parse(question.ennunciate)}&nbsp;</span> 
                                                                {question.page !== null ? <span className="nav-to" onClick={() => {navToPage(question.page)}}>Repasa el apartado {parse(pages[question.page - 1].title)}</span> : ''}
                                                            </p>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <div>
                                    {
                                        cmiDataState.evaluationData.attemps === 0
                                        ?
                                        <p className="results">No dispone de más intentos</p>
                                        :
                                        ''
                                    }
                                </div>
                            }
                        </div>
                        : ''
                    }
                </div>
                : '' 
            }
            </>
        )
    }
}

export default withScorm()(Evaluation);

