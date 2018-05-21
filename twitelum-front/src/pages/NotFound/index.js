import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Widget from '../../components/Widget'
import './notFound.css'

export default class NotFound extends Component {
    render() {

        return (
            <Fragment>
                <Helmet>
                    <title>Página não encontrada - Twitelum</title>
                    <meta name="description" content="Página não encontrada - Twitelum" />
                    <meta name="keywords" content="react,jsx,router" />
                </Helmet>
                <div className="notFound">
                    <div className="container">
                        <Widget>
                            <h1 className="notFound__title">Twitelum</h1>
                            <h2 className="notFound__title">Página não Encontrada :(</h2>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}
