import React, { Component } from 'react'
import autoBind from 'react-autobind';
import picFile1 from '../img/RLE_M3_19.jpg';
import picFile2 from '../img/RLE_M3_20.jpg';
import parse from 'html-react-parser';

class PicCarousel extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            numberPics: 2,
            show: 1
        }
    }

    timer() {
        if(this.state.show === this.state.numberPics - 1) {
            clearInterval(this.intervalId);
        }
        let newShow;
        if(this.state.show !== this.state.numberPics) {
            newShow = this.state.show + 1;
        } else {
            newShow = 1;
        }
        this.setState({show: newShow})
    }
    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 2000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }


    render() {
        const image1 = {
            src: picFile1,
            alt: 'imagen',
            footText: 'Portal laboral <b>Conecto</b>. Recuperado de <a href="https://conecto.utec.edu.pe/" target="_blank">https://conecto.utec.edu.pe/</a>'
        };
        const image2 = {
            src: picFile2,
            alt: 'imagen',
            footText: 'Portal de empleo especializado <b>Indeed</b>. Recuperado de <a href="https://pe.indeed.com/" target="_blank">https://pe.indeed.com/</a>'
        };
        const handleNextPic = () => {
            let newShow;
            if(this.state.show !== this.state.numberPics) {
                newShow = this.state.show + 1;
            } else {
                newShow = 1;
            }
            this.setState({show: newShow})
        }
        const handlePrevPic = () => {
            let newShow;
            if(this.state.show !== 1) {
                newShow = this.state.show - 1;
            } else {
                newShow = this.state.numberPics;
            }
            this.setState({show: newShow})
        }
        
        return (
            <div className="pic-carousel-container">
                <div className="arrow-left-container" onClick={() => handlePrevPic()}>
                    <button style={{borderRadius: '0px'}}><i className="arrow-left-icon"></i></button>
                </div>
                <div className="arrow-right-container"  onClick={() => handleNextPic()}>
                    <button style={{borderRadius: '0px'}}><i className="arrow-right-icon"></i></button>
                </div>
                {this.state.show === 1 ? 
                    <>
                        <img className="carousel-pic" src={image1.src} alt={image1.alt} /> 
                        <p className="pic-footer">{parse(image1.footText)}</p>
                    </>
                    : null }
                {this.state.show === 2 ? 
                    <>
                        <img className="carousel-pic" src={image2.src} alt={image2.alt} /> 
                        <p className="pic-footer">{parse(image2.footText)}</p>
                    </>
                    : null }
            </div>
        )
    }
}

export default PicCarousel;

