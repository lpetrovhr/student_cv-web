import React, { Component } from 'react';
import {
    Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleCompany } from '../../actions/companies';



class SingleCompany extends Component {

    constructor() {
        super();
    }

    componentWillMount() {

    }

    render () {
        return (
            <Container className="main-container animated fadeIn" fluid></Container>
        );
    }
}