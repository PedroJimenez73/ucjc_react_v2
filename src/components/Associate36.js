import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class Associate36 extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            selectedLeft: null,
            selectedRight: null,
            valueLeft: null,
            valueRight: null,
            correctsLeft: [],
            correctsRight: [],
            successfull: false
        }
    }

    terms = {
        letfTerms: [
            {letter: 'a', term: 'Contacto visual'},
            {letter: 'b', term: 'Gesto de manos'},
            {letter: 'c', term: 'Dígalo con estilo'},
            {letter: 'd', term: 'Inflexión'},
        ],
        rightTerms: [
            {letter: 'c', term: '¿Cómo sueles contar las cosas? ¿Qué estilo usas?'},
            {letter: 'a', term: '¿Cuándo expones sueles mirar a tu público?'},
            {letter: 'd', term: '¿Juegas con los niveles de tu voz al exponer?'},
            {letter: 'b', term: '¿Cómo sueles poner tus manos cuando expones?'},
        ]
    }

    componentDidMount() {
        let newCorrectsLeft = [];
        let newCorrectsRight = [];
        this.terms.letfTerms.forEach((elem, i) => {
            newCorrectsLeft.push(false);
            newCorrectsRight.push(false);
        })
        this.setState({
            correctsLeft: newCorrectsLeft,
            correctsRight: newCorrectsRight
        })
    }

    handleToggleSelectLeftItem = (letter, index) => {
        this.setState({
            selectedLeft: index,
            valueLeft: letter
        }, () => this.checkResults())
    }

    handleToggleSelectRightItem = (letter, index) => {
        this.setState({
            selectedRight: index,
            valueRight: letter
        }, () => this.checkResults())
    }

    checkResults() {
        if(this.state.valueLeft === this.state.valueRight) {
            const posLeft = this.terms.letfTerms.findIndex(elem => elem.letter === this.state.valueLeft)
            const posRight = this.terms.rightTerms.findIndex(elem => elem.letter === this.state.valueRight)
            let newCorrectsLeft = this.state.correctsLeft;
            let newCorrectsRight = this.state.correctsRight;
            newCorrectsLeft[posLeft] = true;
            newCorrectsRight[posRight] = true;
            const newSuccessfully = newCorrectsLeft.every(elem => elem === true) && newCorrectsRight.every(elem => elem === true);
            this.setState({
                correctsLeft: newCorrectsLeft,
                correctsRight: newCorrectsRight,
                successfull: newSuccessfully
            })
        }
    }

    render() {
        return (
            <>
                <p className="instructions">Asocie cada elemento de la izquierda con el de la derecha haciendo clic sucesivamente sobre cada uno.</p>
                <div className="flex associate">
                    <div className="col-50">
                        {
                            this.terms.letfTerms.map((item, i) => <div key={i} 
                                                                       className={`item ${this.state.selectedLeft === i ? 'selected' : ''} ${this.state.correctsLeft[i] ? 'success' : ''}`}
                                                                       onClick={() => this.handleToggleSelectLeftItem(item.letter, i)}>
                                                                        {item.term}
                                                                  </div>
                                                                  )
                        }
                    </div>
                    <div className="col-50">
                        {
                            this.terms.rightTerms.map((item, i) => <div key={i} 
                                                                       className={`item ${this.state.selectedRight === i ? 'selected' : ''} ${this.state.correctsRight[i] ? 'success' : ''}`}
                                                                       onClick={() => this.handleToggleSelectRightItem(item.letter, i)}>
                                                                        {item.term}
                                                                  </div>
                                                                  )
                        }
                    </div>
                </div>
                {
                    this.state.successfull ? <p className="associate-success">¡Correcto! Puede continuar a la siguiente pantalla</p> : ''
                }
            </>
        )
    }
}
