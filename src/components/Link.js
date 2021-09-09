import React from 'react';
import link from '../img/icons/link.svg';
import parse from 'html-react-parser';

const Link = (props) => (
    <div className="link-container">
        <img className="link-img" src={ link } alt="Link"/>
        <div>{parse(props.text)}</div>
    </div>
    );

export default Link;