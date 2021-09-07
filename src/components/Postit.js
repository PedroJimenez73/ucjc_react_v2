import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import autoBind from 'react-autobind';

class Postit extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            postItText: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate() {
        //this.getData()
    }

    getData() {
        const {currentPage, cmiDataState} = this.props.sco;

        if (cmiDataState.postitsPagesData && cmiDataState.postitsPagesData[currentPage - 1] !== '') {
            this.setState({postItText: cmiDataState.postitsPagesData[currentPage - 1]})
        }
    }

    onChange = (event) => {
        const {currentPage, setPostit} = this.props.sco;
        this.setState({postItText: event.target.value}, ()=> {
            setPostit(currentPage - 1, this.state.postItText)
        })
    }

    render() {

        return (
            <div className={this.props.showPostIt ? "post-it open" : "post-it"}>
                <div className="post-it-header">
                    <span onClick={this.props.handleShowPostIt}>&times;</span>
                </div>
                <div className="post-it-body">
                    <textarea maxLength="200" 
                              onChange={this.onChange}
                              value={this.state.postItText}></textarea>
                </div>
            </div>  
        )
    }
}

export default withScorm()(Postit);

