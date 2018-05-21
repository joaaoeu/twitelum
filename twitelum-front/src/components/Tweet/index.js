import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './tweet.css'

export default class Tweet extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    static propTypes = {
        tweetInModal: PropTypes.bool,
        handleAbreModalParaTweet: PropTypes.func,
        removeHandler: PropTypes.func,
        tweetInfo: PropTypes.shape({
            conteudo: PropTypes.string,
            likeado: PropTypes.bool,
            totalLikes: PropTypes.number,
            removivel: PropTypes.bool,
            usuario: PropTypes.shape({
                login: PropTypes.string,
                nome: PropTypes.string,
                foto: PropTypes.string
            })
        })
    }

    render() {
        const { conteudo, removivel, likeado, totalLikes } = this.props.tweetInfo
        const { login, nome, foto } = this.props.tweetInfo.usuario
        const removeHandler = this.props.removeHandler
        const handleLike = this.props.handleLike

        return (
            <article className="tweet" onClick={ this.props.handleAbreModalParaTweet }>
                <div className="tweet__cabecalho IgnoraModal">
                    {
                        removivel &&
                        <button onClick={ removeHandler } className="btn btn--blue btn--remove">
                            X
                        </button>
                    }
                    <img className="tweet__fotoUsuario" src={ foto } alt={ nome } />
                    <span className="tweet__nomeUsuario">{ nome }</span>
                    <a href=""><span className="tweet__userName">@{ login }</span></a>
                </div>
                <p className="tweet__conteudo">{ conteudo }</p>
                <footer className="tweet__footer IgnoraModal">
                    <button className="btn btn--clean" onClick={ handleLike }>
                        <svg className={`icon icon--small iconHeart${ likeado ? '--active' : '' }`}
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        { totalLikes }
                    </button>
                </footer>
                <div className="tweet__likeadores">
                    {
                        this.props.tweetInModal &&
                        this.props.tweetInfo.likes.map(
                            (liker) => `@${liker.usuario.login} `
                        )
                    }
                </div>
            </article>
        )
    }
}