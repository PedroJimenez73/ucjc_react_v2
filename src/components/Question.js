import React from 'react';
import question from '../img/icons/question.svg';

const Question = (props) => (
    <div className="question-container">
        <img className="question-img" src={ question } alt="Interrogación"/>
        {props.children}
    </div>
    );

export default Question;