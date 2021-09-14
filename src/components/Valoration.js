import React, { Component } from 'react'
import withScorm from '../services/withScorm';
import autoBind from 'react-autobind';
import i18n from '../services/translations/i18n';

class Valoration extends Component {
    constructor() {
        super()
        autoBind(this);
        this.state = {
            ratingStars: 0,
            ratingComments: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const {cmiDataState} = this.props.sco;
        if (cmiDataState.valoration) {
            this.setState({
                ratingStars: cmiDataState.valoration.ratingStars,
                ratingComments: cmiDataState.valoration.ratingComments,
            })
        }
    }

    getStarClass() {
        if (this.state.ratingStars === 0) {
            return 'stars';
        } else if (this.state.ratingStars === 1) {
            return 'stars one';
        } else if (this.state.ratingStars === 2) {
            return 'stars two';
        } else if (this.state.ratingStars === 3) {
            return 'stars three';
        } else if (this.state.ratingStars === 4) {
            return 'stars four';
        } else if (this.state.ratingStars === 5) {
            return 'stars five';
        } 
    }

    handleStars = (stars) => {
        const {setRatingStars} = this.props.sco;
        this.setState({ratingStars: stars}, () => {
            setRatingStars(this.state.ratingStars)
        })
    }

    handleComments = (event) => {
        const {setRatingComments} = this.props.sco;
        this.setState({ratingComments: event.target.value}, () => {
            setRatingComments(this.state.ratingComments)
        })
    }

    render() {
        return (
            <>
                <div className="stars-rating-container">
                    <p>{i18n.t('valorationInstructions')}</p>
                    <div className={this.getStarClass()}>
                        <div className="star" onClick={() => this.handleStars(1)}>★</div>
                        <div className="star" onClick={() => this.handleStars(2)}>★</div>
                        <div className="star" onClick={() => this.handleStars(3)}>★</div>
                        <div className="star" onClick={() => this.handleStars(4)}>★</div>
                        <div className="star" onClick={() => this.handleStars(5)}>★</div>
                    </div>
                </div>
                <div className="text-rating-container">
                    <p>{i18n.t('valorationFormInstructions')}</p>
                    <textarea onChange={this.handleComments}
                              value={this.state.ratingComments}></textarea>
                </div>
            </>
        )
    }
}

export default withScorm()(Valoration);
