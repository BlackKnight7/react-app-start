import React, {Component} from 'react'
import {connect} from 'react-redux'
import {queryFooterRouters} from '../store/actions/router'
import Home from '../pages/Home'

@connect(state => (
    {
        routers: state.routers
    }
))
class HomeContainer extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(queryFooterRouters());

    }

    render() {
        return (
            <Home routers={this.props.routers} history={this.props.history} pathname={this.props.location.pathname}>
                {this.props.children}
            </Home>
        )
    }
}

export default HomeContainer
