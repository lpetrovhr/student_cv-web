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
            <div className="image-cropper img-responsive" width="100%" style={{ margin: "10px auto" }}>
                {
                    user.profilePicture ?
                        <img className="profile-pic" src={user.profilePicture}></img>
                        :
                        <img className="profile-pic" style={{ marginLeft: "0" }} src={require(`assets/images/avatars/test.png`)}></img>
                }
            </div>
            <CardBody>
                <CardTitle>{user.companyName}</CardTitle>
                <CardText style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.info}</CardText>
                <Link to={`/companies/${user.id}`}><Button color="primary" block>Info</Button></Link>
            </CardBody>
        </Card>
    </Col> : 
    <Col md="4">
        <Card>
            <div className="image-cropper img-responsive" width="100%" style={{ margin: "10px auto" }}>
                {
                    user.profilePicture ?
                    <img className="profile-pic" src={user.profilePicture}></img>
                    :
                    <img className="profile-pic" style={{ marginLeft: "0" }} src={require(`assets/images/avatars/test.png`)}></img>
                }
            </div>
            <CardBody>
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                    <CardText>{user.cvLink ? <a href={user.cvLink} target="__blank">Pogledaj životopis</a> : 'Student trenutno nema životopis'}</CardText>
                <Link to={`/students/${user.id}`}><Button color="primary" block outline>Info</Button></Link>
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