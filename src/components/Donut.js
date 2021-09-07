// import React from 'react';
// import { useState, useEffect } from 'react';
// import donutInfo from '../data/donutInfo';
// import clock from '../img/icons/clock.svg';
// import incorrectAudio from '../audio/bounce.mp3';
// import correctAudio from '../audio/clic.mp3';
// import notPassed from '../audio/fail.mp3';
// import passed from '../audio/winner.mp3';

// export default function Donut() {

//     const [currentLetter, setCurrentLetter] = useState(0);
//     const [textarea, setTextarea] = useState('')
//     const [correct, setCorrect] = useState([])
//     const [fail, setFail] = useState([])
//     const [isOpen, setIsOpen] = useState(false);
//     const [isActive, setIsActive] = useState(false);
//     const [second, setSecond] = useState(60);
//     const [timeConter, setTimeConter] = useState(0);
    
//     const [myAudioCorrect] = useState (new Audio(correctAudio))
//     const [myAudioFail] = useState (new Audio(incorrectAudio))
//     const [myAudioNotPassed] = useState (new Audio(notPassed))
//     const [myAudioPassed] = useState (new Audio(passed))

//     const nextLetter= () => {
//         if(currentLetter === 0){
//             setIsActive(true)
//             setTimeConter(0)
//             setCurrentLetter( currentLetter+1 )
         
//         }else{
//             setCurrentLetter( currentLetter+1 )
//             finishAudio()
//             if(second !== 0){
//                 let rest = 60 - second
//                 setTimeConter(timeConter + rest)
//                 setSecond(60)
//             }else{
//                 setTimeConter(timeConter + 60)
//                 setSecond(60)
                
//             }
            
//         }
//     } 

//     const textareaChange = (e) => {
//         e.preventDefault()
//         setTextarea(  e.target.value )
//     }

//     const check = (letterObject) => {
//         if (textarea.toLowerCase().trim() === letterObject.answer.toLowerCase()){
//             setTextarea('')
//             nextLetter()
//             Correct(letterObject.letter)
//             myAudioCorrect.play()
         
//         } else {
//             wrongAnswer(letterObject.letter)
//         }
//     }

//     const Correct = (letter) => {
//         setCorrect(state => [...state, letter])
//     } 

//     const Fail = (letter) => {
//         setFail(state => [...state, letter])
//     } 

//     const wrongAnswer = (letterObject) => {
//         setTextarea('')
//         nextLetter()
//         Fail(letterObject)
//         myAudioFail.play()
//     }

//     const reset = () => {
//         setTextarea('')
//         setCurrentLetter(0)
//         setCorrect([])
//         setFail([])
//         setIsActive(false)
//         setSecond(60)
//         setIsOpen(false)
//     }
    
//     const toggleAnswer = () => {
//         setIsOpen( prev => !prev )
//     } 
    
//     useEffect(() => { 
//         let intervalId;
//         if (isActive) {
//           intervalId = setInterval(() => {
//             setSecond(second => second - 1);
//           }, 1000)
//         }
//         return () => clearInterval(intervalId);
//       }, [isActive, second])
  

//       const enter = (e, letterObject) => {
//         if(e.which === 13) {
//             e.preventDefault();
//             check(letterObject);
//             setTextarea('')
//         }
//       }

//       const finishAudio = () => {
//         if(currentLetter >= lettersLength){
//             if(correct.length > lettersLength/2){
//                 myAudioPassed.play()
//             }else{
//                 myAudioNotPassed.play()
//             }
//         }
//     } 

//     let letters = donutInfo.filter(letter => letter.ask !== "")

//     let lettersLength = letters.length

//     return(
//         <div className="flex donut" >
//             <div className="col-50 donut-circle">
//                 <ul>
//                 {donutInfo.map((alphabeticObject, i) => 
//                     <li key={i} className={`circle__item  
//                         ${alphabeticObject.ask !== '' ? 'circle__item--on' : ''}      

//                         ${letters.length >= 1 && letters[0].letter === alphabeticObject.letter && currentLetter === 1 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 2 && letters[1].letter === alphabeticObject.letter && currentLetter === 2 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 3 && letters[2].letter === alphabeticObject.letter && currentLetter === 3 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 4 && letters[3].letter === alphabeticObject.letter && currentLetter === 4 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 5 && letters[4].letter === alphabeticObject.letter && currentLetter === 5 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 6 && letters[5].letter === alphabeticObject.letter && currentLetter === 6 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 7 && letters[6].letter === alphabeticObject.letter && currentLetter === 7 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 8 && letters[7].letter === alphabeticObject.letter && currentLetter === 8 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 9 && letters[8].letter === alphabeticObject.letter && currentLetter === 9 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 10 && letters[9].letter === alphabeticObject.letter && currentLetter === 10 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 11 && letters[10].letter === alphabeticObject.letter && currentLetter === 11 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 12 && letters[11].letter === alphabeticObject.letter && currentLetter === 12 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 13 && letters[12].letter === alphabeticObject.letter && currentLetter === 13 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 14 && letters[13].letter === alphabeticObject.letter && currentLetter === 14 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 15 && letters[14].letter === alphabeticObject.letter && currentLetter === 15 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 16 && letters[15].letter === alphabeticObject.letter && currentLetter === 16 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 17 && letters[16].letter === alphabeticObject.letter && currentLetter === 17 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 18 && letters[17].letter === alphabeticObject.letter && currentLetter === 18 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 19 && letters[18].letter === alphabeticObject.letter && currentLetter === 19 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 20 && letters[19].letter === alphabeticObject.letter && currentLetter === 20 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 21 && letters[20].letter === alphabeticObject.letter && currentLetter === 21 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 22 && letters[21].letter === alphabeticObject.letter && currentLetter === 22 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 23 && letters[22].letter === alphabeticObject.letter && currentLetter === 23 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 24 && letters[23].letter === alphabeticObject.letter && currentLetter === 24 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 25 && letters[24].letter === alphabeticObject.letter && currentLetter === 25 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 26 && letters[25].letter === alphabeticObject.letter && currentLetter === 26 ? 'circle__item--animation' : '' } 
//                         ${letters.length >= 27 && letters[26].letter === alphabeticObject.letter && currentLetter === 27 ? 'circle__item--animation' : '' } 

//                         ${correct.includes(alphabeticObject.letter) ? 'circle__item--correct' : '' } 
//                         ${fail.includes(alphabeticObject.letter) ? 'circle__item--fail' : '' } 
//                         `}>
                        
//                         {alphabeticObject.letter}

//                     </li>
//                 )
//                 }
//                 </ul>
//             </div>
//             <div className="col-50 donut-text">
//                 <div className={currentLetter === 0 ? '' : 'none'}>
//                     <p className='text'>A continuación, intente averiguar las palabras de esta unidad en el menor tiempo posible. (Máximo 60 segundos)</p>
//                     <div className="flex j-end a-center m-t">
//                         <button className='outline' onClick={nextLetter}>Comenzar</button>
//                     </div>
//                 </div>
//                 <ul>
//                     {currentLetter <= lettersLength && second > 0 ? 
//                     letters.filter((letterObject, i) => i === currentLetter - 1).map((letterObject, i) =>
//                     <li key={i}>
//                         <div className="flex j-end a-center">
//                             <img src={ clock } alt="Reloj"></img>
//                             <p className="m-l-small"><span>{second}</span> segundos</p>
//                         </div>
//                         <p className="ask-title">Con la <b>{letterObject.letter}</b>:</p>
//                         <p className="ask">{letterObject.ask}</p>
//                         <input type='text' 
//                                value={textarea} 
//                                onChange={textareaChange} 
//                                onKeyPress={(e) => enter(e, letterObject)} />
//                         <div className="flex j-end a-center m-t">
//                             <button className='outline' onClick={(e)=> check(letterObject)}>Comprobar</button>
//                             <button className='outline danger m-l-small' onClick={(e)=> wrongAnswer(letterObject.letter)}>Pasapalabra</button>
//                             {second === 0 ? wrongAnswer(letterObject.letter) : ''} 
    
//                         </div>
//                     </li>
//                     )
//                     : 
//                     <li>
//                         <h3>Resultados</h3>
//                         <p><b>Aciertos:</b> {correct.length} de {lettersLength} </p>
//                         <p><b>Tiempo empleado:</b> {timeConter} segundos</p>

//                         {correct.length > lettersLength / 2 ? 
//                             <p className="success">Enhorabuena ha superado la prueba.</p>
//                         :   
//                             <p className="fail">Lo sentimos no ha superado la prueba.</p>
//                         }

//                         <div className="flex j-end a-center m-t">
//                             <button className='outline' onClick={reset}>Intentar de nuevo</button>
//                             <button className='outline m-l-small' onClick={toggleAnswer}>
                                
//                                 {isOpen ? 'Ocultar respuestas' : 'Ver respuestas'}
//                             </button>
//                         </div>
                    
//                         <ul className={isOpen ? '' : 'none'}>
//                             {letters.map((alphabeticObject, i) => 
//                             <li key={i} className="correct-answers">
//                                 <p>{alphabeticObject.answer}</p>
//                                 <p>{alphabeticObject.ask}</p>
//                             </li>
//                             )
//                             }
//                         </ul>
//                     </li>
//                     }
//                 </ul> 
//             </div>
//         </div>
//     )
// }

import React, { Component } from 'react'
import autoBind from 'react-autobind';
import donutInfo from '../data/donutInfo';
import clock from '../img/icons/clock.svg';
import bounce from '../audio/bounce.mp3';
import clic from '../audio/clic.mp3';
import fail from '../audio/fail.mp3';
import success from '../audio/winner.mp3';

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
                        <p className='text'>A continuación, intente averiguar las palabras de esta unidad en el menor tiempo posible. (Máximo {this.state.seconds} segundos)</p>
                        <div className="flex j-end a-center m-t">
                            <button className='outline' onClick={() => {this.handleStart()}}>Comenzar</button>
                        </div>
                    </div>
                    <div className={this.state.showStart ? 'none' : ''}>
                     { this.state.isPlaying && this.state.seconds > 0 ? 
                        <>
                            <div className="flex j-end a-center">
                                <img src={ clock } alt="Reloj"></img>
                                <p className="m-l-small"><span>{this.state.seconds}</span> segundos</p>
                            </div>
                            <p className="ask-title">Con la <b>{this.state.letters[this.state.counter]}</b>:</p>
                            <p className="ask">{donutInfo.questions[this.state.counter]}</p>
                            <input type='text' id="word"/>
                         <div className="flex j-end a-center m-t">
                             <button className='outline' onClick={()=> this.handleCheckWord()}>Comprobar</button>
                             <button className='outline danger m-l-small' onClick={()=> this.handleCheckWord()}>Pasapalabra</button>    
                         </div>
                        </>
                     : 
                        <>
                            <h3>Resultados</h3>
                            <p><b>Aciertos:</b> {this.state.corrects} de {this.state.letters.length} </p>
                            <p><b>Tiempo empleado:</b> {this.state.letters.length * 15 - this.state.seconds} segundos</p>

                            { this.state.corrects / this.state.letters.length >= 0.5 ? 
                                <p className="success">Enhorabuena ha superado la prueba.</p>
                            :   
                                <p className="fail">Lo sentimos no ha superado la prueba.</p>
                            }
                            <div className="flex j-end a-center m-t">
                                <button className='outline' onClick={() => {this.handleReset()}}>Intentar de nuevo</button>
                                <button className='outline m-l-small' onClick={() => {this.handleToggleShowAnswer()}}>
                                    {this.state.showAnswer ? 'Ocultar respuestas' : 'Ver respuestas'}
                                </button>
                            </div>
                            <ul className={this.state.showAnswer ? '' : 'none'}>
                                {donutInfo.answers.map((answer, i) => 
                                    <li key={i} className="correct-answers">
                                        <p>{answer}</p>
                                        <p>{donutInfo.questions[i]}</p>
                                    </li>
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
