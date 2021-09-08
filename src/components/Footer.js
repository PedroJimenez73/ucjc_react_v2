import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import {pages} from '../App';
import { Translation } from "react-i18next";

class Footer extends Component {

    
    render() {

        const {currentPage, previousPage, nextPage, exit} = this.props.sco;
        
        return (
            <footer>
                <button className="solid" onClick={exit}><Translation>{(t, { i18n }) => <>{t('exitButton')}</>}</Translation></button>
                <div className="flex">
                    {
                        currentPage !== 1 
                        ? <button className="solid" onClick={previousPage}><Translation>{(t, { i18n }) => <>{t('prevButton')}</>}</Translation></button>
                        : ''
                    }
                    <div className="counter">{currentPage} / {pages.length}</div>
                    {
                        currentPage !== (pages.length)
                        ? <button className="solid" onClick={nextPage}><Translation>{(t, { i18n }) => <>{t('nextButton')}</>}</Translation></button>
                        : ''
                    }
                </div>
            </footer>
        )
    }
}

export default withScorm()(Footer);


