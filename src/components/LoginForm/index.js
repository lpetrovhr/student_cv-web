import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FormInput from 'components/FormInput';
import PrependFormInput from 'components/PrependFormInput';

import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormControl } from 'reactstrap';

import ErrorMsg from 'components/ErrorMessage';
import SuccessMessage from 'components/SuccessMessage';
import { isRequired, isEmail } from '../../middleware/validator';

export const validate = (values) => {
    const errors = {};
    const { email, password } = values.toJS();

    errors.email = isRequired(email, 'hr') || isEmail(email, 'hr');
    errors.password = isRequired(password, 'hr');

    return errors;
};

const LoginForm = props => {

        const { error, handleSubmit, submitting } = props;

        const errorMessage = error;

        return (
            <Form onSubmit={handleSubmit}>
                <h1>Prijava</h1>
                <p className="text-muted">Prijavite se!</p>
                
                <Field name="email" type="email" placeholder="E-mail" component={PrependFormInput} icon="user"/>
                
                <Field name="password" type="password" placeholder="Lozinka" component={PrependFormInput} icon="lock" />
                
                <Row>
                    <Col xs="6">
                        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <Button type="submit" color="primary" className="px-4" disabled={submitting}>Prijava</Button>
                    </Col>
                    <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Zaboravili ste lozinku?</Button>
                    </Col>
                </Row>
            </Form>
        );
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);