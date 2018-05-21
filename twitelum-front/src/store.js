import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = { lista: [], tweetAtivo: {} }, action = {}) {    
    if(action.type === 'CARREGA_TWEETS') {
        return {
            ...state,
            lista: action.tweets
        }
    }

    if(action.type === 'ADICIONA_TWEET') {
        return {
            ...state,
            lista: [action.novoTweet, ...state.lista]
        }
    }

    if(action.type === 'REMOVE_TWEET') {
        return {
            ...state,
            lista: state.lista.filter( (tweet) => tweet._id !== action.idTweet )
        }
    }

    if(action.type === 'ADD_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: state.lista.find( (tweet) => tweet._id === action.idTweetSelecionado )
        }
    }

    if(action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if(action.type === 'LIKE') {
        const listaDeTweetsAtualizada = state.lista.filter( (tweet) => {
            if(tweet._id === action.idTweet) {
                const { likeado, totalLikes } = tweet

                if(tweet.likeado) {
                    tweet.likes = tweet.likes.filter ( (like) => like.usuario.login !== action.liker )
                } else {
                    tweet.likes = [{ usuario: { login: action.liker } }, ...tweet.likes]
                }

                tweet.likeado = !likeado
                tweet.totalLikes = likeado ? totalLikes -1 : totalLikes + 1
            }

            return tweet
        })

        const tweetAtivoAtualizado = listaDeTweetsAtualizada
                                        .find((tweet) => tweet._id === state.tweetAtivo._id)
        
        return {
            tweetAtivo: { ...tweetAtivoAtualizado } || {},
            lista: listaDeTweetsAtualizada
        }
    }

    return state
}

function notificacaoReducer(state = '', action = {}) {
    if(action.type === 'ADD_NOTIFICACAO') {
        return action.notificacao
    }

    if(action.type === 'REMOVE_NOTIFICACAO') {
        return ''
    }

    return state
}

export default createStore(
    combineReducers({
       tweets: tweetsReducer,
       notificacao: notificacaoReducer,
    }),
    applyMiddleware(
        thunk
    )
)