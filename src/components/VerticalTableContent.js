import React, { Component } from 'react'

class VerticalTable extends Component {

    render() {
        return (
                <div className={this.props.open ? 'content-tab visible' : 'content-tab'}
                    key={this.props.index}>
                    {this.props.children}
                </div>
        )
    }
}

export default VerticalTable
