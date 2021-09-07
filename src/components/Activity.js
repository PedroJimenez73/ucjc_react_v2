import React from 'react';
import activity from '../img/icons/activity.svg';

const Activity = (props) => (
    <div className="question-container">
        <img className="question-img" src={ activity } alt="Actividad"/>
        <div>
            {props.children}
        </div>
    </div>
    );

export default Activity;