import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import { loginFetch } from '../../actions/auth';

class LoginComponent extends Component {

    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {
        const { dispatch, history } = this.props;
        const submitedValues = values.toJS();

        return dispatch(loginFetch(submitedValues)).then(() => { history.push('/') });
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <LoginForm onSubmit={this.onFormSubmit} />
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down">
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Registracija</h2>
                                            <p>Kako bi mogli koristiti puni potencijal ove aplikacije, molimo da se registrirate.</p>
                                            <Link to="/register/student"><Button color="primary" className="mt-3" active>Registracija za studente!</Button></Link>
                                            <Link to="/register/company"><Button color="primary" className="mt-3" active>Registracija za poslodavce!</Button></Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.string
};


export default withRouter(connect()(LoginComponent));
