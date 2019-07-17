import React, { Component } from 'react';
import { FooterNav, Header } from '../components/index'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { PageLoading } from "../components/index";

const Tab2 = Loadable({
    loader: () => import('./tab2'),
    loading: PageLoading,
    timeout: 10000
});
const Tab3 = Loadable({
    loader: () => import('./tab3'),
    loading: PageLoading
});
const Tab4 = Loadable({
    loader: () => import('./tab4'),
    loading: PageLoading
});



class Home extends Component {
    componentDidMount() {
        window.H5Icarus.setConfig({
            "commonPop_config": "test",
            "test": {
                "action": "http://data.globalkyu.com:8088/mixin/787890/",
                "conditions": {
                    "versionRegualr": "1.0"
                },
                "context": {
                    "message": "We are looking forward to your feedback",
                    "negativeText": "Next Time",
                    "positiveText": "Feedback now",
                    "title": "test"
                },
                "endDate": "1563577321202",
                "interval": "0",
                "delayTime": "5000",
                "showEvent": "onPageAppear",
                "showTargets": "http://localhost:3000/tab2",
                "startDate": "1562577321202",
                "times": "100",
                "type": "QuestionnaireInProcessFullScreen",
                "uuid": "test"
            }
        });
    }

    render() {
        return (
            <div>
                <Header routers={this.props.routers} history={this.props.history} pathname={this.props.pathname} />
                <div>
                    <Route path='/tab2' component={Tab2} />
                    <Route path='/tab3' component={Tab3} />
                    <Route path='/tab4' component={Tab4} />
                </div>
                <FooterNav routers={this.props.routers} pathname={this.props.pathname} />
            </div>
        )
    }
}

Home.propType = {
    routers: PropTypes.arrayOf(PropTypes.object).isRequired,
    pathname: PropTypes.string.isRequired,
    history: PropTypes.object
};

export default Home

