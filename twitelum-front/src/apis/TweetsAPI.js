export const carrega = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${ localStorage.getItem('TOKEN') }`)
        .then(response => response.json())
        .then((tweets) => {
            dispatch({
                type: 'CARREGA_TWEETS',
                tweets
            })
        })
    }
}

export const adiciona = (novoTweet) => {
    return (dispatch) => {
        if(novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${ localStorage.getItem('TOKEN') }`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then(response => response.json())
            .then((novoTweetRegistradoNoServer) => {
                dispatch({
                    type: 'ADICIONA_TWEET',
                    novoTweet: novoTweetRegistradoNoServer
                })
            })
        }
    }
}

export const remove = (idTweet) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${ idTweet }?X-AUTH-TOKEN=${ localStorage.getItem('TOKEN') }`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((responseJSON) => {
            dispatch({
                type: 'REMOVE_TWEET',
                idTweet
            })
            dispatch({ type: 'REMOVE_TWEET_ATIVO' })
            dispatch({ type: 'ADD_NOTIFICACAO', notificacao: 'Tweet removido com sucesso' })
        })
    }
}

export const like = (idTweet, liker) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${ idTweet }/like?X-AUTH-TOKEN=${ localStorage.getItem('TOKEN') }`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then((responseJSON) => {
            dispatch({
                type: 'LIKE',
                idTweet,
                liker: responseJSON.liker
            })
        })
    }
}

export default {
    carrega,
    adiciona,
    remove,
    like
}