import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

export default class Modal extends Component {
    static propTypes = {
        isAberto: PropTypes.bool,
        fechaModal: PropTypes.func
    }

    render() {
        return (
            <div className={`modal ${this.props.isAberto ? 'modal--active' : ''}`} onClick={this.props.fechaModal}>
                {
                    this.props.isAberto &&
                    <div className="modal__wrap">
                        { this.props.children }
                    </div>
                }
            </div>
        )
    }
}