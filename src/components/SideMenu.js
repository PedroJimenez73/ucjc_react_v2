import React, { Component, createRef } from 'react';
import withScorm from '../services/withScorm';
import generalInfo from '../data/generalInfo';
import parse from 'html-react-parser';
import {pages} from '../App';
import rightArrow from '../img/icons/right_arrow.svg'

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.asideMenuRef = createRef();
    }
    
    render() {
        const {navToPage} = this.props.sco;
        
        const handleToggleAsideMenu = () => {
            this.asideMenuRef.current.classList.toggle('open')
        }

        return (
            <aside ref={this.asideMenuRef}>
                <div id="burger" onClick={handleToggleAsideMenu}>
                    <div className="bar up"></div>
                    <div className="bar middle"></div>
                    <div className="bar down"></div>
                </div>
                <div className="side-head">
                    <div>
                        <h1>{parse(generalInfo.title)}</h1>
                    </div>
                </div>
                <div className="menu">
                    {pages.map((page, index) => {
                        if(page.title !== '' && page.title !== pages[index - 1]?.title) {
                            return <div key={index} className="item" onClick={() => {
                                                                        navToPage(index + 1);
                                                                        this.asideMenuRef.current.classList.toggle('open');
                                                                    }}>
                                        <div className="text-box">
                                            <p key={index}>{page.item} {parse(page.title)}</p>
                                        </div>
                                        <div className="icon-box">
                                            <img src={rightArrow} alt="" />
                                        </div>
                                </div>
                        } else {
                            return null;
                        }
                    })}
                    <p className="copyright">&copy; 2021 Universidad Camilo José Cela</p>
                </div>
            </aside>
        )
    }
}

export default withScorm()(SideMenu);


