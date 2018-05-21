import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import TweetsAPI from '../apis/TweetsAPI'

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
        },
        handleLike: () => {
            dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)