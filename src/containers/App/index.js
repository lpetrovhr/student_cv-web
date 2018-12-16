import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import store from 'store';

import { logoutAction } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

// Components
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Home from 'containers/Home';
import Students from 'containers/Students';
import Companies from 'containers/Companies';
import Posts from 'containers/Posts';
import UserPosts from 'containers/UserPosts';
import SingleStudent from 'containers/SingleStudent';
import SingleCompany from 'containers/SingleCompany';
import StudentEdit from 'containers/StudentEdit';
import CompanyEdit from 'containers/CompanyEdit';
import AddPost from 'containers/AddPost';
import PostEdit from 'containers/PostEdit';
import Login from 'containers/Login';
import AdminUsers from 'containers/AdminUsers';

/* styles */
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'styles/core/_dropdown-menu-right.scss';


function requireAuth(nextState, replaceState) {
    if (!store.get('token')) {
        return false;
    }
    return true;
}

class App extends Component {

    constructor() {
        super();
        this.state = { isLogged: false };
        this.handdleLogout = this.handdleLogout.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;

        if (store.get('token')) {
            this.setState({ isLogged: true });
            this.getUserData();
        } else {
            this.setState({ isLogged: false });
        }
    }

    getUserData() {
        const { dispatch } = this.props;

        const currentUser = store.get('user');
        return dispatch(getCurrentProfile(currentUser.id));
    }

    handdleLogout(e) {
        const { dispatch, history } = this.props;
        e.preventDefault();
        dispatch(logoutAction(() => { this.setState({ isLogged: false }); history.push('/') }));
    }

    render () {

        const { user, students, profile } = this.props;

        const currentUser = store.get('user');

        return (
            <div className="app">
                <Header isLogged={this.state.isLogged} user={currentUser} handdleLogout={this.handdleLogout} />
                <div className="app-body">
                    <Sidebar isLogged={this.state.isLogged} user={currentUser} />  
                    <main className="main">
                            <Route exact path="/" component={Home} />
                            <Route exact path="/students" component={Students} />
                            <Route path="/students/:id" component={SingleStudent} />
                            <Route exact path="/companies" component={Companies} />
                            <Route path="/companies/:id" component={SingleCompany} />
                            <Route exact path="/posts" component={Posts} />
                            
                            <Route path="/posts/edit/:id" render={() => (requireAuth() ? (<PostEdit />) : (<Redirect to="/login" />))} />
                            <Route path="/posts/user" render={() => (requireAuth() ? (<UserPosts />) : (<Redirect to="/login" />))} />
                            <Route path="/student/edit" render={() => (requireAuth() ? (<StudentEdit />) : (<Redirect to="/login" />))} />
                            <Route path="/company/edit" render={() => (requireAuth() ? (<CompanyEdit />) : (<Redirect to="/login" />))} />
                            <Route path="/posts/new" render={() => (requireAuth() ?  (<AddPost />) : (<Redirect to="/login" />))} />
                            <Route path="/users/all" render={() => (requireAuth() ? (<AdminUsers />) : (<Redirect to="/login" />))} />
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default connect(state => ({
    user: state.get('user'),
    profile: state.get('profile'),
    token: state.get('token')
}))(withRouter(App));
