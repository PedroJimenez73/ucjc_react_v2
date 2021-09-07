import React from 'react';
import quote from '../img/icons/quote.svg';
import parse from 'html-react-parser';

const Quote = (props) => (
    <div className="quote-container">
        <img className="quote-img" src={ quote } alt="Cita"/>
        <p className="quote-text">{parse(props.text)}</p>
        <p className="quote-author">{parse(props.author)}</p>
    </div>
    );

export default Quote;