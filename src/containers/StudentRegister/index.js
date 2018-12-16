import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import StudentRegisterForm from 'components/StudentRegisterForm';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { createStudentUser, loginFetch } from '../../actions/auth';

class StudentRegister extends Component {

    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {
        const { dispatch, history } = this.props;
        const formValues = values.toJS();

        return dispatch(createStudentUser(formValues)).then(dispatch(loginFetch({ email: formValues.email, password: formValues.password })).then(() => { history.push('/') }));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <StudentRegisterForm onSubmit={this.onFormSubmit} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


StudentRegister.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect()(StudentRegister));