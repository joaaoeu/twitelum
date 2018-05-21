import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './cabecalho.css'

export default class Cabecalho extends Component {
    render() {
        return (
            <header className="cabecalho">
                <div className="cabecalho__container container">
                    <h1 className="cabecalho__logo">
                        <Link className="navMenu__link" to="/">Twitelum</Link>
                    </h1>
                    { this.props.children }
                </div>
            </header>
        )
    }
}