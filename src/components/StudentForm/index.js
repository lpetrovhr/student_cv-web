import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { withProps } from 'recompose';
import {
    Row, Col, Container,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    FormGroup, Input, Form, FormText, Label,
    InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSingleStudent } from '../../actions/students';
import FormInput from 'components/FormInput';
import SelectInput from 'components/SelectInput';

import ErrorMsg from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';
import { isRequired } from '../../middleware/validator';

export const validate = (values) => {
    const errors = {};
    const { firstName, lastName } = values.toJS();

    errors.firstName = isRequired(firstName, 'hr');
    errors.lastName = isRequired(lastName, 'hr');

    return errors;
};

const StudentForm = props => {

    const { error, categories, submitting, submitSucceeded, handleSubmit } = props;

    const errorMessage = error;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label sm={2}>E-mail</Label>
                <Col sm={10}>
                    <Field
                        name="email"
                        component={FormInput}
                        type="email"
                        placeholder="E-mail"
                        disabled
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Ime</Label>
                <Col sm={10}>
                    <Field
                        name="firstName"
                        component={FormInput}
                        type="text"
                        placeholder="Ime"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Prezime</Label>
                <Col sm={10}>
                    <Field
                        name="lastName"
                        component={FormInput}
                        type="text"
                        placeholder="Prezime"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Kategorija</Label>
                <Col sm={10}>
                    <Field name="categoryId" component={SelectInput} data={categories} defaultHolder={"Odaberite kategoriju"} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Zivotopis</Label>
                <Col sm={10}>
                    <Field
                        name="cv"
                        component={FormInput}
                        type="text"
                        placeholder="Zivotopis"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                {submitSucceeded && !submitting &&
                    <SuccessMessage>Promjene uspješno spremljene.</SuccessMessage>
                }
                {error && <ErrorMsg>{errorMessage}</ErrorMsg>}
            </FormGroup>
            <FormGroup row>
                <Col sm={12}>
                    <Button type="submit" color="primary" disabled={submitting}>Spremi</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default withProps(({ user }) => ({
    initialValues: {
        email: user.email,
        firstName: user.student.firstName,
        lastName: user.student.lastName,
        cv: user.student.cvLink,
        categoryId: user.student.categories[0] ? user.student.categories[0].id : {},
    },
}))(reduxForm({
    form: 'studentForm',
    enableReinitialize: true,
    validate
})(StudentForm));