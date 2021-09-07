import React from 'react';
import question from '../img/icons/question.svg';
import parse from 'html-react-parser';

const Question = (props) => (
    <div className="question-container">
        <img className="question-img" src={ question } alt="Interrogación"/>
        <div>{parse(props.text)}</div>
    </div>
    );

export default Question;