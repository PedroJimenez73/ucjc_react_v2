import React, { Component } from 'react'
import parse from 'html-react-parser';

class Timeline16 extends Component {

    render() {
        return (
            <article>
                <div className="item" onClick={() => this.props.handleArticle(this.props.index)}>
                    <div className="pic">
                        <span>{parse(this.props.title)}</span>
                    </div>
                </div>
                <div className={this.props.open ? 'content active' : 'content'}>
                    {this.props.children}
                </div>
            </article>
        )
    }
}

export default Timeline16;
