import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import {pages} from '../App';

class Footer extends Component {

    render() {
        const {currentPage, previousPage, nextPage, exit} = this.props.sco;
        
        return (
            <footer>
                <button className="solid" onClick={exit}>Salir</button>
                <div className="flex">
                    {
                        currentPage !== 1 
                        ? <button className="solid" onClick={previousPage}>Anterior</button>
                        : ''
                    }
                    <div className="counter">{currentPage} / {pages.length}</div>
                    {
                        currentPage !== (pages.length)
                        ? <button className="solid" onClick={nextPage}>Siguiente</button>
                        : ''
                    }
                </div>
            </footer>
        )
    }
}

export default withScorm()(Footer);


