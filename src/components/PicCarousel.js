import React, { Component } from 'react'
import autoBind from 'react-autobind';

class PicCarousel extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: []
        }
    }

    componentDidMount() {
        let newOpenState = this.state.open;
        this.props.children.forEach(() => {newOpenState.push(false)})
        newOpenState[0] = true;
        this.setState({
            open: newOpenState,
            counter: 0,
            showSpinner: true
        });
        this.intervalId = setInterval(this.timer.bind(this), 2000);
    }

    timer() {
        if(this.state.counter === this.props.children.length - 1) {
            clearInterval(this.intervalId);
        }
        let newCounter = this.state.counter;
        let newOpen = [];
        if (newCounter < this.props.children.length - 1) {
            newCounter++;
            this.props.children.forEach(() => {newOpen.push(false)})
            newOpen[newCounter] = true;
            this.setState({
                open: newOpen,
                counter: newCounter
            })
        }
        if (this.state.counter === this.props.children.length - 1) {
            this.setState({showSpinner: false})
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }


    render() {
        const handleNextPic = () => {
            let newCounter = this.state.counter;
            let newOpen = [];
            if (newCounter < this.props.children.length - 1) {
                newCounter++;
                this.props.children.forEach(() => {newOpen.push(false)})
                newOpen[newCounter] = true;
                this.setState({
                    open: newOpen,
                    counter: newCounter
                })
            }
        }
        const handlePrevPic = () => {
            let newCounter = this.state.counter;
            let newOpen = [];
            if (newCounter !== 0) {
                newCounter--;
                this.props.children.forEach(() => {newOpen.push(false)})
                newOpen[newCounter] = true;
                this.setState({
                    open: newOpen,
                    counter: newCounter
                })
            }
        }
        
        return (
            <div className="pic-carousel-container">
                {this.state.showSpinner ? <div className="lds-ellipsis on-carousel"><div></div><div></div><div></div><div></div></div> : ''}
                {this.state.counter !== 0 ?
                    <div className="arrow-left-container" onClick={() => handlePrevPic()}>
                        <button><i className="arrow-left-icon"></i></button>
                    </div>
                : ''}
                {this.state.counter < this.props.children.length - 1 ?
                    <div className="arrow-right-container"  onClick={() => handleNextPic()}>
                        <button><i className="arrow-right-icon"></i></button>
                    </div>
                : ''}
                {this.props.children.map((child, i) => {
                    return React.cloneElement(child, {index: i, open: this.state.open[i]});
                    }                            
                )}
            </div>
        )
    }
}

export default PicCarousel;

