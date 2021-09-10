import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import {pages} from '../App';
import i18n from '../services/translations/i18n';


class Footer extends Component {

    render() {

        const {currentPage, previousPage, nextPage, exit} = this.props.sco;
        
        return (
            <footer>
                <button className="solid" onClick={exit}>{i18n.t('exitButton')}</button>
                <div className="flex">
                    {
                        currentPage !== 1 
                        ? <button className="solid" onClick={previousPage}>{i18n.t('prevButton')}</button>
                        : ''
                    }
                    <div className="counter">{currentPage} / {pages.length}</div>
                    {
                        currentPage !== (pages.length)
                        ? <button className="solid" onClick={nextPage}>{i18n.t('nextButton')}</button>
                        : ''
                    }
                </div>
            </footer>
        )
    }
}

export default withScorm()(Footer);


