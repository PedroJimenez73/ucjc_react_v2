import React, { Component } from 'react';
import logo1 from '../img/logos/logo_1.svg';
import logo2 from '../img/logos/logo_2.svg';
import Spinner from './Spinner';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <div className="logo-container">
                    <img src={logo1} alt="" />
                    <img src={logo2} alt="" />
                </div>
                <Spinner />
            </div>
        )
    }
}
