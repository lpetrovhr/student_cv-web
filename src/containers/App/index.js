import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Container } from 'reactstrap';

// Components
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Home from 'containers/Home';
import Students from 'containers/Students';
import Companies from 'containers/Companies';
import SingleStudent from 'containers/SingleStudent';
import SingleCompany from 'containers/SingleCompany';
// import Breadcrumb from 'components/Breadcrumb';

// import Menu from 'components/Menu';
// import Routing from 'components/Routing';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../../scss/style.scss';
// Temp fix for reactstrap
import '../../../scss/core/_dropdown-menu-right.scss';

// import FontAwesome from '../../views/Icons/FontAwesome/';

class App extends Component {

    render () {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar />  
                    <main className="main">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/students" component={Students} />
                                <Route path="/students/:id" component={SingleStudent} />
                                <Route exact path="/companies" component={Companies} />
                                <Route path="/companies/:id" component={SingleCompany} />
                            </Switch>
                    </main>
                </div>
            </div>
        );
    }
}

export default App;