import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import TweetsAPI from '../../apis/TweetsAPI'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Modal from '../../components/Modal'
import Tweet from '../../containers/TweetPadrao'

export default class Home extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor() {
        super()
  
        this.state = {
            usuario: localStorage.getItem('USER'),
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }
    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            this.setState({
                tweets: this.context.store.getState().tweets.lista,
                tweetAtivo: this.context.store.getState().tweets.tweetAtivo
            })
        })
    }

    componentDidMount() {
        this.context.store.dispatch(TweetsAPI.carrega())
    }
    
    adicionaTweet = (event) => {
        event.preventDefault()

        this.context.store.dispatch(TweetsAPI.adiciona(this.state.novoTweet))

        this.setState({
            novoTweet: ''
        })
    }

    abreModalParaTweet = (event, idTweetSelecionado) => {
        const ignoraModal = event.target.closest('.IgnoraModal')

        if(!ignoraModal) {
            this.context.store.dispatch({
                type: 'ADD_TWEET_ATIVO',
                idTweetSelecionado
            })            
        }
    }

    fechaModal = (event) => {
        const isModal = event.target.closest('.widget')

        if(!isModal) {
            this.context.store.dispatch({ type: 'REMOVE_TWEET_ATIVO' })
        }
    }

    render() {
        const usuario = this.state.usuario
        const novoTweet = this.state.novoTweet
        const tweets = this.state.tweets
        const adicionaTweet = this.adicionaTweet

        return (
            <Fragment>
                <Helmet>
                    <title>Twitelum</title>
                    <meta name="description" content="Home - Twitelum" />
                    <meta name="keywords" content="react,jsx,router" />
                </Helmet>
                <Cabecalho>
                    <NavMenu usuario={`@${ usuario }`} />
                </Cabecalho>
                <div className="container">
                    <Dashboard posicao="esquerda">
                        <Widget>
                            <form className="novoTweet" onSubmit={ adicionaTweet }>
                                <div className="novoTweet__editorArea">
                                    <span className={`novoTweet__status${
                                            novoTweet.length > 140
                                            ? ' novoTweet__status--invalido' : ''
                                        }`}>
                                        { novoTweet.length }/140
                                    </span>
                                    <textarea
                                        className="novoTweet__editor"
                                        value={ novoTweet }
                                        onChange={
                                            (event) => this.setState({
                                                novoTweet: event.target.value
                                            })
                                        }
                                        placeholder="O que está acontecendo?">
                                    </textarea>
                                </div>
                                <button className="novoTweet__envia"
                                        disabled={
                                            novoTweet.length === 0 || novoTweet.length > 140
                                            ? true : false
                                        }
                                        type="submitusuario">
                                    Tweetar
                                </button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {
                                    tweets.length === 0
                                    ? 'Nenhum tweet por enquanto :('
                                    : tweets.map(
                                        (tweetInfo) =>
                                        <Tweet
                                            key={ tweetInfo._id }
                                            tweetInfo={ tweetInfo }
                                            handleAbreModalParaTweet={ (event) => this.abreModalParaTweet(event,tweetInfo._id)} />
                                    )
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
                <Modal fechaModal={ this.fechaModal } isAberto={ !!this.state.tweetAtivo._id }>
                    <Widget>
                        <Tweet
                            key={ this.state.tweetAtivo._id }
                            tweetInfo={ this.state.tweetAtivo }
                            tweetInModal={ true } />
                    </Widget>
                </Modal>
                {
                    this.context.store.getState().notificacao &&
                    <div
                        className="notificacaoMsg"
                        onAnimationEnd={ () => this.context.store.dispatch({ type: 'REMOVE_NOTIFICACAO' }) } >
                        { this.context.store.getState().notificacao }
                    </div>
                }
            </Fragment>
        )
    }
}