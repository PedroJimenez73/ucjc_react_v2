import React, { Component } from 'react'
import autoBind from 'react-autobind';
import withScorm from '../services/withScorm';
import generalInfo from '../data/generalInfo';
import frontpage from '../img/frontpage.jpg';

class Slide extends Component {

    constructor() {
        super()
        autoBind(this);
    }

    render() {
        return (
            <div className="credits">
                <div className="data">
                    <p>{generalInfo.teacherTextGender}</p>
                    <hr />
                    <p>{generalInfo.teacherName}</p>
                    <hr />
                    <p>&copy; 2021 Universidad Camilo José Cela</p>
                </div>
                <img src={frontpage} alt="" />
            </div>
        )
    }
}

export default withScorm()(Slide);