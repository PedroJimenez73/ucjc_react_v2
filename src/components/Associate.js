import React, { Component } from 'react';
import autoBind from 'react-autobind';
import i18n from '../services/translations/i18n';

class Associate extends Component {
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

    componentDidMount() {
        let newCorrectsLeft = [];
        let newCorrectsRight = [];
        this.props.terms.letfTerms.forEach((elem, i) => {
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
            const posLeft = this.props.terms.letfTerms.findIndex(elem => elem.letter === this.state.valueLeft)
            const posRight = this.props.terms.rightTerms.findIndex(elem => elem.letter === this.state.valueRight)
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
                <p className="instructions">{i18n.t('associateInstructions')}</p>
                <div className="flex associate">
                    <div className="col-50">
                        {
                            this.props.terms.letfTerms.map((item, i) => <div key={i} 
                                                                       className={`item ${this.state.selectedLeft === i ? 'selected' : ''} ${this.state.correctsLeft[i] ? 'success' : ''}`}
                                                                       onClick={() => this.handleToggleSelectLeftItem(item.letter, i)}>
                                                                        {item.term}
                                                                  </div>
                                                                  )
                        }
                    </div>
                    <div className="col-50">
                        {
                            this.props.terms.rightTerms.map((item, i) => <div key={i} 
                                                                       className={`item ${this.state.selectedRight === i ? 'selected' : ''} ${this.state.correctsRight[i] ? 'success' : ''}`}
                                                                       onClick={() => this.handleToggleSelectRightItem(item.letter, i)}>
                                                                        {item.term}
                                                                  </div>
                                                                  )
                        }
                    </div>
                </div>
                {
                    this.state.successfull ? <p className="associate-success">{i18n.t('associateMessage')}</p> : ''
                }
            </>
        )
    }
}

export default Associate;
