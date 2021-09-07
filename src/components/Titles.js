import React, { Component } from 'react'
import withScorm from '../scormServices/withScorm';
import highlight from '../img/icons/hightlight.svg';
import erase from '../img/icons/erase.svg';
import postitIcon from '../img/icons/message-square.svg';
import Postit from '../components/Postit';
import parse from 'html-react-parser';

class Titles extends Component {
    constructor() {
        super()
        this.state = {
            showPostIt: false,
            postItCompleted: false
        }
        this.handleShowPostIt = this.handleShowPostIt.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const {currentPage, cmiDataState} = this.props.sco;

        if (cmiDataState.postitsPagesData && cmiDataState.postitsPagesData[currentPage - 1] !== '') {
            this.setState({postItCompleted: true})
        }
    }

    handleShowPostIt() {
        this.setState({showPostIt: !this.state.showPostIt})
        const {currentPage, cmiDataState} = this.props.sco;

        if (cmiDataState.postitsPagesData[currentPage - 1] !== '') {
            this.setState({postItCompleted: true})
        } else {
             this.setState({postItCompleted: false})
        }
    }

    render() {
        return (
            <div className="titles">
                <div>
                    <h2>{parse(this.props.title)}</h2>
                    <h3>{parse(this.props.subtitle)}</h3>
                </div>
                {this.props.showHighLightButtons ? <div className="buttons">
                    <button className="outline icon m-l-small" 
                            onClick={this.props.handleHiglight}
                            title="Seleccione un texto y pulse para subrayar">
                        <img src={highlight} alt="" />
                    </button>
                    <button className="outline icon m-l-small" 
                            onClick={this.props.handleErase}
                            title="Pulse para borrar el subrayado">
                        <img src={erase} alt="" />
                    </button>
                    <button className={this.state.postItCompleted ? "outline icon m-l-small completed" : "outline icon m-l-small"}
                            title="Pulse para escribir un post-it"
                            onClick={this.handleShowPostIt}>
                        <img src={postitIcon} alt="" />
                    </button>
                </div> : ''}
                <Postit showPostIt={this.state.showPostIt} 
                        handleShowPostIt={this.handleShowPostIt}/>
            </div>
        )
    }
}

export default withScorm()(Titles);
