import React, { Component } from 'react';
import withScorm from '../services/withScorm';
import generalInfo from '../data/generalInfo';
import parse from 'html-react-parser';

class Frontpage extends Component {

    componentDidMount() {
        const {navToPage} = this.props.sco;
        navToPage(1)
    }

    render() {
        return (
            <div className="frontpage">
                <div className="frontpage-text">
                    <p>{parse(generalInfo.degree)}</p>
                    <hr />
                    <p>{parse(generalInfo.subject)}</p>
                    <hr />
                    <p>{parse(generalInfo.title)}</p>
                    <hr />
                    <p>{generalInfo.credits}</p>
                    <p>{generalInfo.teacherName}</p>
                </div>
            </div>
        )
    }
}

export default withScorm()(Frontpage);
