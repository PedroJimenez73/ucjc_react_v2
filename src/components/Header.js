import React, { Component } from 'react';
import withScorm from '../scormServices/withScorm';
import generalInfo from '../data/generalInfo';
import parse from 'html-react-parser';

class Header extends Component {

    render() {
        const {currentPage, totalPages} = this.props.sco;
        return (
            <header>
                <h1>{currentPage !== 1 ? parse(generalInfo.title) : ''}</h1>
                {
                    currentPage !== totalPages
                    ?
                        <img src='https://ucjc.blackboard.com/bbcswebdav/institution/UCJC/Sistemas/Contenidos/logo_black.svg' alt="Logo UCJC" />
                    :
                    ''
                }
            </header>
        )
    }
}

export default withScorm()(Header);


