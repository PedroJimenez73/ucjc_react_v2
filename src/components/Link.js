import React from 'react';
import link from '../img/icons/link.svg';
import parse from 'html-react-parser';

const Link = (props) => (
    <div className="question-container">
        <img className="question-img" src={ link } alt="Link"/>
        <div>{parse(props.text)}</div>
    </div>
    );

export default Link;