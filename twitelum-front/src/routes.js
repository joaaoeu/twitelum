import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function estaAutenticado() {
    if(localStorage.getItem('TOKEN')) {
        return true
    } else {
        return false
    }
}

class PrivateRoute extends Component {
    render() {
        const props = this.props
        const Component = props.component

        if(estaAutenticado()) {
            return ( <Route render={ () => <Component { ...props } /> } /> )
        } else {
            return ( <Redirect to="/login" /> )
        }
    }
}

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path="/" component={ Home } exact />
            <Route path="/login" component={ Login } />
            <Route path="*" component={ NotFound } />
        </Switch>
    )
}

export default Routes