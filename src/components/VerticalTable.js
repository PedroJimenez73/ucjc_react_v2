import React, { Component } from 'react'
import autoBind from 'react-autobind';
import parse from 'html-react-parser';

class VerticalTable extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            open: []
        }
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize = () => {
        const tabsTitles = document.querySelectorAll('.tabs div');
        const tabsContent = document.querySelectorAll('.content-tab');
        let maxHeightContent = 0;
        tabsContent.forEach(elem => {
            if(elem.offsetHeight > maxHeightContent) {
                maxHeightContent = elem.offsetHeight;
            }
        })
        tabsTitles.forEach(elem => elem.style.minHeight = (maxHeightContent / tabsContent.length) + 20 + 'px')
    }

    componentDidMount() {
        const tabsTitles = document.querySelectorAll('.tabs div');
        const tabsContent = document.querySelectorAll('.content-tab');
        let newOpenState = [];
        let maxHeightContent = 0;
        tabsContent.forEach(elem => {
            if(elem.offsetHeight > maxHeightContent) {
                maxHeightContent = elem.offsetHeight;
            }
            newOpenState.push(false);
        })
        tabsTitles.forEach(elem => elem.style.minHeight = (maxHeightContent / tabsContent.length) + 20 + 'px')
        newOpenState[0] = true;
        this.setState({open: newOpenState});
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    render() {
        const handleVerticalTable = (e) => {
            let newOpenState = this.state.open;
            newOpenState = newOpenState.map((elem, i) => {
                if(e === i) {
                    return !elem;
                } else {
                    return false
                }
            });
            this.setState({open: newOpenState})
        }
        return (
            <section className="tab">
                <div className="tabs">
                    {
                        this.props.titles.map((title, i) => {
                            return (
                                <div className={this.state.open[i] ? 'check' : ''} 
                                    onClick={() => handleVerticalTable(i)}>
                                    <p>{parse(title)}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="content-tabs">
                    {this.props.children.map((child, i) => {
                        return React.cloneElement(child, {index: i, open: this.state.open[i]});
                        }                            
                    )}
                </div>
            </section>
        )
    }
}

export default VerticalTable
