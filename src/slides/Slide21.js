import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import { pages } from '../App';
import Titles from '../components/Titles';
import AutoEvaluation from '../components/AutoEvaluation';
class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        const {currentPage} = this.props.sco;
        
        const questions = [
            '¿Lorem ipsum dolor sit amet consectetur?',
            '¿Facilis ut sint eum voluptatum voluptate?',
            '¿Doloremque molestias rerum, ea sit nemo reiciendis?',
        ]

        const feedback = [
            {correct: true, text: 'Correcto. Lorem ipsum dolor sit amet consectetur'},
            {correct: false, text: 'No es correcto. Lorem ipsum dolor sit amet consectetur'},
            {correct: false, text: 'No es correcto. Facilis ut sint eum voluptatum voluptate'},
        ]

        return (
            <div className="slide">
                <Titles title={pages[currentPage - 1].title}
                        subtitle={'Autocomprobación'}
                        showHighLightButtons={false}
                        showPostItButton={false}
                        />
                <div className="row" id="selectable">
                    <div className="col-100">
                        <AutoEvaluation questions={questions} feedback={feedback}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withScorm()(Slide);
