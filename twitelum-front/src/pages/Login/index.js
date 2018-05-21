import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Widget from '../../components/Widget'
import './login.css'

export default class Login extends Component {
    constructor() {
        super()
  
        this.state = {
            erro: ''
        }
    }

    componentWillMount() {
        localStorage.clear()
    }

    fazerLogin = (event) => {
        event.preventDefault()

        const dadosLogin = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(dadosLogin)
        })
        .then((response) => {
            if (!response.ok)
                throw response
            return response.json()
        })
        .then((responseJSON) => {
            localStorage.setItem('TOKEN', responseJSON.token)
            localStorage.setItem('USER', dadosLogin.login)
            this.props.history.push('/')
        })
        .catch((responseError) => {
            responseError.json().then((responseError) => {
                this.setState({
                    erro: responseError.message
                })
            })
        })
    }

    render() {
        const fazerLogin = this.fazerLogin
        const erro = this.state.erro

        return (
            <Fragment>
                <Helmet>
                    <title>Login - Twitelum</title>
                    <meta name="description" content="Login - Twitelum" />
                    <meta name="keywords" content="react,jsx,router" />
                </Helmet>
                <div className="login">
                    <div className="container">
                        <Widget>
                            <h1 className="login__title">Twitelum</h1>
                            <form className="login__form" action="/" onSubmit={ fazerLogin }>
                                <div className="login__inputWrap">
                                    <label className="login__label" htmlFor="login">Login</label> 
                                    <input ref={ (inputLogin) => this.inputLogin = inputLogin } className="login__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="login__inputWrap">
                                    <label className="login__label" htmlFor="senha">Senha</label> 
                                    <input ref={ (inputSenha) => this.inputSenha = inputSenha } className="login__input" type="password" id="senha" name="senha"/>
                                </div>
                                <div className={`login__errorBox${
                                        erro.length === 0
                                        ? ' login__errorBox_hide' : ''
                                    }`}>
                                    { erro }
                                </div>
                                <div className="login__inputWrap">
                                    <button className="login__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}
