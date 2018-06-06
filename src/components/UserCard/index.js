import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
    Col,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const UserCard = ({ user, key, type }) => (
    type == 'company' ?
    <Col md="4">
        <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>{user.companyName}</CardTitle>
                <CardText>{user.info}</CardText>
                <Link to={`/companies/${user.id}`}><Button color="primary">Info</Button></Link>
            </CardBody>
        </Card>
    </Col> : 
    <Col md="4">
        <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                <CardText>{user.cvLink ? user.cvLink : 'Student trenutno nema životopis'}</CardText>
                <Link to={`/students/${user.id}`}><Button color="primary">Info</Button></Link>
            </CardBody>
        </Card>
    </Col>
);

UserCard.protoTypes = {
    key: PropTypes.number,
    user: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}

export default withRouter(UserCard);