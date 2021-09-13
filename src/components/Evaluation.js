import React, { Component, createRef } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import EvaluationInfo from '../data/evaluationInfo';
import icon1 from '../img/icons/check-circle.svg';
import icon2 from '../img/icons/x-circle.svg';
import parse from 'html-react-parser';
import { pages } from '../App';
import i18n from '../services/translations/i18n';

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
        this.topRef = createRef();
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
            this.topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        return (
            <>
            <div ref={this.topRef}>&nbsp;</div>
            {
                !this.state.showEvaluation && cmiDataState.evaluationData.attemps === cmiDataState.evaluationData.maxAttemps
                ?  
                    <div className="evaluation-instructions">
                        <p>{i18n.t('evaluationTexts.intro')}</p> 
                        <ul>
                            <li>{i18n.t('evaluationTexts.instructionsA') + this.state.userAnswers.length + i18n.t('evaluationTexts.instructionsB')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsC')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsD') + cmiDataState.evaluationData.attemps + i18n.t('evaluationTexts.instructionsE')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsF')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsG')}</li>
                        </ul>
                        <div className="flex j-end a-center m-t">
                            <button className="outline" onClick={() => this.handleStartEvaluation()}>{i18n.t('evaluationTexts.startButton')}</button>
                        </div>
                    </div>
                : '' 
            }
            {
                !this.state.showEvaluation && cmiDataState.evaluationData.attemps < cmiDataState.evaluationData.maxAttemps && cmiDataState.evaluationData.attemps !== 0 && cmiDataState.evaluationData.corrects / this.state.userAnswers.length < 0.5
                ?  
                    <div className="evaluation-instructions">
                        <p><b>{i18n.t('evaluationTexts.newTryIntro')}</b></p>
                        <p>{i18n.t('evaluationTexts.intro')}</p> 
                        <ul>
                            <li>{i18n.t('evaluationTexts.instructionsA') + this.state.userAnswers.length + i18n.t('evaluationTexts.instructionsB')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsC')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsD') + cmiDataState.evaluationData.attemps + i18n.t('evaluationTexts.instructionsE')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsF')}</li>
                            <li>{i18n.t('evaluationTexts.instructionsG')}</li>
                        </ul>
                        {
                            cmiDataState.evaluationData.attemps === 1
                            ?
                            <p>{i18n.t('evaluationTexts.lastTry')}</p>
                            :
                            <p>{i18n.t('evaluationTexts.tryCounterA') + cmiDataState.evaluationData.attemps + i18n.t('evaluationTexts.tryCounterB')}</p>
                        }
                        <div className="flex j-end a-center m-t">
                            <button className="outline" onClick={() => this.handleStartEvaluation()}>{i18n.t('evaluationTexts.newTryButton')}</button>
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
                                {i18n.t('evaluationTexts.successMessage') + cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}.
                            </p>
                            :
                            <p className="flex j-center a-center">
                                <img className="m-r" src={icon2} alt="" />
                                {i18n.t('evaluationTexts.failMessage') + cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}.
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
                        {!this.state.validForm ? <p className="valid-text">{i18n.t('evaluationTexts.failValidation')}</p>: null}
                        {!this.state.showAnswers ? 
                                <button disabled={!this.state.validForm} 
                                        className="outline m-l-small"
                                        onClick={() => {setResults()}}>{i18n.t('evaluationTexts.checkButton')}</button> : null}
                    </div>
                    {
                        this.state.showAnswers
                        ? 
                        <div>
                            {
                                cmiDataState.evaluationData.corrects / this.state.userAnswers.length >= 0.5
                                ?
                                <p className="success">{i18n.t('evaluationTexts.successMessage') + cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}</p>
                                : 
                                <p className="danger">{i18n.t('evaluationTexts.failMessage') + cmiDataState.evaluationData.corrects + '/' + this.state.userAnswers.length}</p>
                            }
                            {
                                cmiDataState.evaluationData.attemps > 0 && cmiDataState.evaluationData.corrects / this.state.userAnswers.length < 0.5
                                ?
                                <div className="row">
                                    <div className="col-100">
                                        {
                                            cmiDataState.evaluationData.attemps === 1
                                            ?
                                            <p className="result">{i18n.t('evaluationTexts.tryRemainder')}</p>
                                            :
                                            <p className="result">{i18n.t('evaluationTexts.tryRemainderA') + cmiDataState.evaluationData.attemps + i18n.t('evaluationTexts.tryRemainderB')}</p>
                                        }
                                        <p>{i18n.t('evaluationTexts.failQuestionsIntro')}</p>
                                        { 
                                            EvaluationInfo.questions.map((question, i) => {
                                                return (
                                                    <>
                                                        {this.state.results[i] 
                                                            ? '' : 
                                                            <p className="result">
                                                                <span>{parse(question.ennunciate)}&nbsp;</span> 
                                                                {question.page !== null ? <span className="nav-to" onClick={() => {navToPage(question.page)}}>{i18n.t('evaluationTexts.navToText')} {parse(pages[question.page - 1].title)}</span> : ''}
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
                                        <p className="results">{i18n.t('evaluationTexts.zeroTry')}</p>
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

