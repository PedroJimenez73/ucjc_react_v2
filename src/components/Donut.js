
import React, { Component } from 'react'
import autoBind from 'react-autobind';
import donutInfo from '../data/donutInfo';
import clock from '../img/icons/clock.svg';
import bounce from '../audio/bounce.mp3';
import clic from '../audio/clic.mp3';
import fail from '../audio/fail.mp3';
import success from '../audio/winner.mp3';
import i18n from '../services/translations/i18n';

export default class Donut extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            letters: [],
            counter: 0,
            seconds: 0,
            corrects: 0,
            showStart: true,
            isPlaying: false,
            showAnswer: false
        }
        this.lettersElement = null;
    }

    componentDidMount() {
        let newLetters = [];
        donutInfo.answers.map(elem => newLetters.push(elem[0]));
        let newSeconds = newLetters.length * 15;
        this.setState({letters: newLetters, seconds: newSeconds}, () => {
            this.lettersElement = document.querySelectorAll('.on');
        });
    }

    handleStart() {
        this.setState({showStart: false, isPlaying: true})
        this.timer = setInterval(() => {
            let newSeconds = this.state.seconds;
            newSeconds--;
            this.setState({seconds: newSeconds}, () => {    
                if(this.state.seconds === 0) {
                    clearInterval(this.timer);
                }
            })
        }, 1000);
        this.lettersElement[this.state.counter].classList.add('active');
    }

    handleCheckWord() {
        this.lettersElement[this.state.counter].classList.remove('active');
        if(this.state.counter < this.state.letters.length - 1) {
            if(document.getElementById('word').value === donutInfo.answers[this.state.counter]) {
                this.lettersElement[this.state.counter].classList.add('success');
                const newCorrects = this.state.corrects + 1;
                this.setState({corrects: newCorrects});
                document.getElementById('clic').play();
            } else {
                this.lettersElement[this.state.counter].classList.add('fail');
                document.getElementById('bounce').play();
            }
            document.getElementById('word').value = '';
            const newCounter = this.state.counter + 1;
            this.setState({counter: newCounter}, () => {
                this.lettersElement[this.state.counter].classList.add('active');
            });
        } else {
            if(document.getElementById('word').value === donutInfo.answers[this.state.counter]) {
                this.lettersElement[this.state.counter].classList.add('success');
                const newCorrects = this.state.corrects + 1;
                this.setState({corrects: newCorrects});
                document.getElementById('clic').play();
            } else {
                this.lettersElement[this.state.counter].classList.add('fail');
                document.getElementById('bounce').play();
            }
            this.setState({isPlaying: false});
            clearInterval(this.timer);
            if(this.state.corrects / this.state.letters.length >= 0.5) {
                document.getElementById('success-song').play();
            } else {
                document.getElementById('fail-song').play();
            }
        }
    }

    handleReset() {
        this.setState({
            counter: 0,
            seconds: this.state.letters.length * 15,
            corrects: 0,
            showAnswer: false
        }, () => {this.handleStart()});
        this.lettersElement.forEach((elem) => {
            elem.classList.remove('success');
            elem.classList.remove('fail');
        })
    }

    handleToggleShowAnswer() {
        this.setState({showAnswer: !this.state.showAnswer});
    }

    render() {
        return (
            <div className="flex donut">
                <div className="col-50 donut-circle">
                    <ul>
                        <li className={this.state.letters.includes('a') ? 'item on' : 'item'}>A</li>
                        <li className={this.state.letters.includes('b') ? 'item on' : 'item'}>B</li>
                        <li className={this.state.letters.includes('c') ? 'item on' : 'item'}>C</li>
                        <li className={this.state.letters.includes('d') ? 'item on' : 'item'}>D</li>
                        <li className={this.state.letters.includes('e') ? 'item on' : 'item'}>E</li>
                        <li className={this.state.letters.includes('f') ? 'item on' : 'item'}>F</li>
                        <li className={this.state.letters.includes('g') ? 'item on' : 'item'}>G</li>
                        <li className={this.state.letters.includes('h') ? 'item on' : 'item'}>H</li>
                        <li className={this.state.letters.includes('i') ? 'item on' : 'item'}>I</li>
                        <li className={this.state.letters.includes('j') ? 'item on' : 'item'}>J</li>
                        <li className={this.state.letters.includes('k') ? 'item on' : 'item'}>K</li>
                        <li className={this.state.letters.includes('l') ? 'item on' : 'item'}>L</li>
                        <li className={this.state.letters.includes('m') ? 'item on' : 'item'}>M</li>
                        <li className={this.state.letters.includes('n') ? 'item on' : 'item'}>N</li>
                        <li className={this.state.letters.includes('ñ') ? 'item on' : 'item'}>Ñ</li>
                        <li className={this.state.letters.includes('o') ? 'item on' : 'item'}>O</li>
                        <li className={this.state.letters.includes('p') ? 'item on' : 'item'}>P</li>
                        <li className={this.state.letters.includes('q') ? 'item on' : 'item'}>Q</li>
                        <li className={this.state.letters.includes('r') ? 'item on' : 'item'}>R</li>
                        <li className={this.state.letters.includes('s') ? 'item on' : 'item'}>S</li>
                        <li className={this.state.letters.includes('t') ? 'item on' : 'item'}>T</li>
                        <li className={this.state.letters.includes('u') ? 'item on' : 'item'}>U</li>
                        <li className={this.state.letters.includes('v') ? 'item on' : 'item'}>V</li>
                        <li className={this.state.letters.includes('w') ? 'item on' : 'item'}>W</li>
                        <li className={this.state.letters.includes('x') ? 'item on' : 'item'}>X</li>
                        <li className={this.state.letters.includes('y') ? 'item on' : 'item'}>Y</li>
                        <li className={this.state.letters.includes('z') ? 'item on' : 'item'}>Z</li>
                    </ul>
                </div>
                <div className="col-50  donut-text">
                    <div className={this.state.showStart ? '' : 'none'}>
                        <p className='text'>{i18n.t('donutTexts.intro') + ' ' + this.state.seconds + ' ' + i18n.t('donutTexts.seconds') + ')'}</p>
                        <div className="flex j-end a-center m-t">
                            <button className='outline' onClick={() => {this.handleStart()}}>{i18n.t('donutTexts.startButton')}</button>
                        </div>
                    </div>
                    <div className={this.state.showStart ? 'none' : ''}>
                     { this.state.isPlaying && this.state.seconds > 0 ? 
                        <>
                            <div className="flex j-end a-center">
                                <img src={ clock } alt="Reloj"></img>
                                <p className="m-l-small"><span>{this.state.seconds}</span> &nbsp;{i18n.t('donutTexts.startButton')}</p>
                            </div>
                            <p className="ask-title">{i18n.t('donutTexts.with')}&nbsp; <b>{this.state.letters[this.state.counter]}</b>:</p>
                            <p className="ask">{donutInfo.questions[this.state.counter]}</p>
                            <input type='text' id="word"/>
                         <div className="flex j-end a-center m-t">
                             <button className='outline' onClick={()=> this.handleCheckWord()}>{i18n.t('donutTexts.checkButton')}</button>
                             <button className='outline danger m-l-small' onClick={()=> this.handleCheckWord()}>{i18n.t('donutTexts.stepButton')}</button>    
                         </div>
                        </>
                     : 
                        <>
                            <h3>{i18n.t('donutTexts.results')}</h3>
                            <p><b>{i18n.t('donutTexts.corrects')}</b> {this.state.corrects} / {this.state.letters.length} </p>
                            <p><b>{i18n.t('donutTexts.time')}</b> {this.state.letters.length * 15 - this.state.seconds} {i18n.t('donutTexts.seconds')}</p>

                            { this.state.corrects / this.state.letters.length >= 0.5 ? 
                                <p className="success">{i18n.t('donutTexts.successMessage')}</p>
                            :   
                                <p className="fail">{i18n.t('donutTexts.failMessage')}</p>
                            }
                            <div className="flex j-end a-center m-t">
                                <button className='outline' onClick={() => {this.handleReset()}}>{i18n.t('donutTexts.tryAgainButton')}</button>
                                <button className='outline m-l-small' onClick={() => {this.handleToggleShowAnswer()}}>
                                    {this.state.showAnswer ? i18n.t('hideAnswerButton') : i18n.t('showAnswerButton')}
                                </button>
                            </div>
                            <ul className={this.state.showAnswer ? '' : 'none'}>
                                {donutInfo.answers.map((answer, i) => 
                                    <div key={i} className="correct-answers">
                                        <p>{answer}</p>
                                        <p>{donutInfo.questions[i]}</p>
                                    </div>
                                )
                             }
                         </ul>
                        </>
                     }
                    </div>
                </div>
                <audio src={clic} id="clic"></audio>
                <audio src={bounce} id="bounce"></audio>
                <audio src={fail} id="fail-song"></audio>
                <audio src={success} id="success-song"></audio>
            </div>
        )
    }
}
