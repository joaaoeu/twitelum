import React, { Component } from 'react'
import './widget.css'

export default class Widget extends Component {
    render() {
        return (
            <div className="widget">
                { this.props.children }
            </div>
        )
    }
}