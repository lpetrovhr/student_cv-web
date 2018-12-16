import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form/immutable';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PrependFormInput from 'components/PrependFormInput';
import FormInput from 'components/FormInput';
import SelectInput from 'components/SelectInput';
import { Map } from 'immutable';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormControl } from 'reactstrap';
import { isEmail, isPassword, isRequired, isSamePassword } from '../../middleware/validator';

import ErrorMessage from 'components/ErrorMessage';

export const validate = (values) => {
    const errors = {};
    const { email, password, passwordRepeat } = values.toJS();

    errors.email = isRequired(email, 'hr') || isEmail(email, 'hr');
    errors.password = isRequired(password, 'hr') || isPassword(password, 'hr');
    errors.passwordRepeat = isRequired(password, 'hr') || isSamePassword(password, passwordRepeat, 'hr');

    return errors;
};

const SocialForm = props => {

    const { error, handleSubmit, submitting, submitSucceeded, social, user } = props;

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup row>
                <Col sm={5}>
                    <Field name="Facebook" component={FormInput} disabled/>
                </Col>
                <Col sm={5}>
                    <Field name={`${social}.link`} component={FormInput} placeholder="Poveznica" />
                </Col>
                <Col sm={2}>
                    <Button color="danger" type="button" onClick={() => fields.remove(index)}>Izbriši</Button>
                </Col>
            </FormGroup>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit" color="success" disabled={submitting} block>Spremi</Button>
        </Form>
    )
};

export default withRouter(connect(state => ({
}))(reduxForm({
    form: 'socialForm',
    enableReinitialize: true,
    validate,
})(SocialForm)));