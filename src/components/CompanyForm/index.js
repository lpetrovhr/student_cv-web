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
import { zipCodes } from '../../constants/zip_codes';

import ErrorMessage from 'components/ErrorMessage';


const CompanyForm = props => {

    const { error, categories, submitting, submitSucceeded, handleSubmit } = props;

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
                <Label sm={2}>Naziv firme</Label>
                <Col sm={10}>
                    <Field
                        name="companyName"
                        component={FormInput}
                        type="text"
                        placeholder="Naziv firme"
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
                <Label sm={2}>Adresa</Label>
                <Col sm={10}>
                    <Field
                        name="address"
                        component={FormInput}
                        type="text"
                        placeholder="Adresa"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Grad</Label>
                <Col sm={10}>
                    <Field
                        name="zipCode"
                        component={FormInput}
                        type="text"
                        placeholder="Grad"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Broj telefona</Label>
                <Col sm={10}>
                    <Field
                        name="phone"
                        component={FormInput}
                        type="text"
                        placeholder="Broj telefona"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>OIB</Label>
                <Col sm={10}>
                    <Field
                        name="oib"
                        component={FormInput}
                        type="text"
                        placeholder="OIB"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Kratki opis</Label>
                <Col sm={10}>
                    <Field
                        name="info"
                        component={FormInput}
                        type="text"
                        placeholder="Kratki opis"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormGroup>
            <FormGroup row>
                <Col sm={12}>
                    <Button type="submit" color="primary">Spremi</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}

export default withProps(({ user }) => ({
    initialValues: {
        email: user.email,
        companyName: user.company.companyName,
        address: user.company.address,
        zipCode: Object.keys(zipCodes).find(key => zipCodes[key] == user.company.zip),
        phone: user.company.phone,
        oib: user.company.oib,
        info: user.company.info,
        categoryId: user.company.categories[0] ? user.company.categories[0].id : {},
    },
}))(reduxForm({
    form: 'companyForm',
    enableReinitialize: true,
})(CompanyForm));