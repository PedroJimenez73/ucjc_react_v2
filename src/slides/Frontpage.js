import React, { Component } from 'react';
import withScorm from '../scormServices/withScorm';
import generalInfo from '../data/generalInfo';

class Frontpage extends Component {

    componentDidMount() {
        const {navToPage} = this.props.sco;
        navToPage(1)
    }

    render() {
        return (
            <div className="frontpage">
                <div class="frontpage-text">
                    <p>{generalInfo.degree}</p>
                    <hr />
                    <p>{generalInfo.subject}</p>
                    <hr />
                    <p>{generalInfo.title}</p>
                    <hr />
                    <p>{generalInfo.credits}</p>
                    <p>{generalInfo.teacherName}</p>
                </div>
            </div>
        )
    }
}

export default withScorm()(Frontpage);
