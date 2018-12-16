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

import moment from 'moment';
import DatePicker from 'react-datepicker';

import FormInput from 'components/FormInput';
import SelectInput from 'components/SelectInput';
import ErrorMsg from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';


const PostEditForm = props => {

    const { error, post, submitting, postTypes, postCategories, submitSucceeded, handleSubmit, handleEndDate, handleStartDate } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Label sm={2}>Opis</Label>
                <Col sm={10}>
                    <Field
                        name="info"
                        component={FormInput}
                        type="text"
                        placeholder="Opis"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Tip</Label>
                <Col sm={10}>
                    <Field name="typeId" component={SelectInput} data={postTypes} defaultHolder={"Odaberite tip događaja"} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Kategorija</Label>
                <Col sm={10}>
                    <Field name="categoryId" component={SelectInput} data={postCategories} defaultHolder={"Odaberite kategoriju"} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Početak</Label>
                <Col sm={10}>
                    <DatePicker timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={moment(post.posts.data.startDate)} onChange={handleStartDate} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Kraj</Label>
                <Col sm={10}>
                    <DatePicker timeFormat="HH:mm" timeCaption="Vrijeme" showTimeSelect locale="hr-HR" selected={moment(post.posts.data.endDate)} onChange={handleEndDate} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={10}>
                    {submitSucceeded && !submitting &&
                        <SuccessMessage>Obavijest uspješno spremljena.</SuccessMessage>
                    }
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                </Col>
            </FormGroup>
            <FormGroup row>
                <Button type="submit" color="primary" disabled={submitting}>Dodaj obavijest</Button>
            </FormGroup>
        </Form>
    );
}

export default withProps(({ post }) => ({
    initialValues: {
        categoryId: 3,
        info: post.postInfo,
        typeId: post.typeId,
    },
}))(reduxForm({
    form: 'postEditForm',
    enableReinitialize: true,
})(PostEditForm));