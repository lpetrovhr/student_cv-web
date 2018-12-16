import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import CompanyRegisterForm from 'components/CompanyRegisterForm';
import { createCompanyUser, loginFetch } from '../../actions/auth';
import { zipCodes } from '../../constants/zip_codes';
import PropTypes from 'prop-types';

// const checkForZip = value => {
//     return zipCodes[value];
//     // function getKeyByValue(object, value) {
//     //     return Object.keys(object).find(key => object[key] === value);
//     // }
// }

class CompanyRegister extends Component {

    constructor() {
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(values) {
        const { dispatch, history } = this.props;
        const formValues = values.toJS();

        formValues.zipCode = zipCodes[formValues.zipCode];
        return dispatch(createCompanyUser(formValues)).then(dispatch(loginFetch({ email: formValues.email, password: formValues.password })).then(() => { history.push('/') }));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <CompanyRegisterForm onSubmit={this.onFormSubmit} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

CompanyRegister.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.string
};

export default withRouter(connect()(CompanyRegister));
