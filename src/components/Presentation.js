import React, { Component, createRef } from 'react';
import autoBind from 'react-autobind';

class Presentation extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            backgroundHeight: 0,
            backgroundWidth: 0,
            countSlide: 1
        }
        this.slidesRef = [];
        this.backSlideRef = createRef();
        this.btnSlideBackRef = createRef();
        this.btnSlideNextRef = createRef();
    }

    loadSliders = () => {
        let newbackgroundHeight = 0;
        const newbackgroundWidth = this.backSlideRef.current.scrollWidth;
        this.slidesRef.forEach((slide) => {
            if (slide.scrollHeight > newbackgroundHeight) {
                newbackgroundHeight = slide.scrollHeight;
            }
        })
        this.setState({
            backgroundHeight: newbackgroundHeight,
            backgroundWidth: newbackgroundWidth
        }, () => {
            this.slidesRef.forEach((slide, index) => {
                slide.style.height = this.state.backgroundHeight + "px";
                slide.style.left = -index * this.state.backgroundWidth + 40 + "px";
            })
            this.backSlideRef.current.style.height = this.state.backgroundHeight + 80 + "px";
            this.updateSlideBtn();
        });
    }

    handleResize = () => {
        const newbackgroundWidth = this.backSlideRef.current.scrollWidth;
        this.setState({ backgroundWidth: newbackgroundWidth, countSlide: 1 }, () => {
            this.slidesRef.forEach((slide, index) => {
                slide.style.height = "auto";
                slide.style.left = "40px";
                slide.style.opacity = "1";
            })
            this.backSlideRef.current.style.height = "auto";
            this.backSlideRef.current.style.display = "none";
            const timer = setTimeout(() => {
                this.backSlideRef.current.style.display = "block";
                this.loadSliders();
                this.updateSlideBtn();
                clearTimeout(timer);
            }, 1000)
        })
    }

    componentDidMount() {
        this.loadSliders();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    updateSlideBtn = () => {
        if(Array.isArray(this.props.children)) {
            if (this.state.countSlide === 1) {
                this.btnSlideBackRef.current.style.display = 'none';
                this.btnSlideNextRef.current.style.display = 'block';
            } else if (this.state.countSlide === this.slidesRef.length) {
                this.btnSlideBackRef.current.style.display = 'block';
                this.btnSlideNextRef.current.style.display = 'none';
            } else {
                this.btnSlideBackRef.current.style.display = 'block';
                this.btnSlideNextRef.current.style.display = 'block';
            }
        } else {
            this.btnSlideBackRef.current.style.display = 'none';
            this.btnSlideNextRef.current.style.display = 'none';
        }
    }

    handleNextSlide = () => {
        const newCountSlide = this.state.countSlide + 1;
        this.setState({ countSlide: newCountSlide }, () => {
            this.slidesRef.forEach((slide, index) => {
                slide.style.left = slide.offsetLeft + this.state.backgroundWidth + 'px';
                slide.style.opacity = "0";
                if (index === (this.state.countSlide - 1)) {
                    slide.style.opacity = '1';
                }
            })
            this.btnSlideBackRef.current.style.pointerEvents = 'none';
            this.btnSlideNextRef.current.style.pointerEvents = 'none';
            const timer = setTimeout(() => {
                this.btnSlideBackRef.current.style.pointerEvents = 'auto';
                this.btnSlideNextRef.current.style.pointerEvents = 'auto';
                this.updateSlideBtn();
                clearTimeout(timer);
            }, 900)
        })
    }

    handlePrevSlide = () => {
        const newCountSlide = this.state.countSlide - 1;
        this.setState({ countSlide: newCountSlide }, () => {
            this.slidesRef.forEach((slide, index) => {
                slide.style.left = slide.offsetLeft - this.state.backgroundWidth + 'px';
                slide.style.opacity = "0";
                if (index === (this.state.countSlide - 1)) {
                    slide.style.opacity = '1';
                }
            })
            this.btnSlideBackRef.current.style.pointerEvents = 'none';
            this.btnSlideNextRef.current.style.pointerEvents = 'none';
            const timer = setTimeout(() => {
                this.btnSlideBackRef.current.style.pointerEvents = 'auto';
                this.btnSlideNextRef.current.style.pointerEvents = 'auto';
                this.updateSlideBtn();
                clearTimeout(timer);
            }, 900)
        })
    }


    render() {
        return (
            <div id="back-slide" ref={this.backSlideRef}>
                <button id="btn-slide-back" ref={this.btnSlideBackRef} onClick={() => {this.handlePrevSlide()}}>&lt;</button>
                {Array.isArray(this.props.children) ? this.props.children.map((child, i) => {
                    return React.cloneElement(child, {index: i, slidesRef: this.slidesRef});
                }) : (React.cloneElement(this.props.children, {index: 0, slidesRef: this.slidesRef}))}
                <button id="btn-slide-next" ref={this.btnSlideNextRef} onClick={() => {this.handleNextSlide()}}>&gt;</button>
            </div>
        )
    }
}

export default Presentation;


