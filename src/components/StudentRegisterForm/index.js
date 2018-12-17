import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PrependFormInput from 'components/PrependFormInput';

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

const StudentRegisterForm = props => {

    const { error, handleSubmit, submitting } = props;
    
    const errorMessage = error && error == "user.duplicate" ? "Korisnik sa ovom adresom elektroničke pošte već postoji." : "Došlo je do greške.";

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Registracija</h1>
            <p className="text-muted">Izradi studentski korisnički račun</p>
            
            <Field type="text" name="firstName" placeholder="Ime" component={PrependFormInput} icon="user" />

            <Field type="text" name="lastName" placeholder="Prezime" component={PrependFormInput} icon="user" />
    
            <Field type="email" name="email" placeholder="E-mail" component={PrependFormInput} symbol="@" />

            <Field type="password" name="password" placeholder="Lozinka" component={PrependFormInput} icon="lock" />

            <Field type="password" name="passwordRepeat" placeholder="Ponovite lozinku" component={PrependFormInput} icon="lock" />
          
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button type="submit" color="success" disabled={submitting} block>Izradi račun</Button>
            <Link to="/login"><Button style={{ width: "100%" }} color="primary" className="mt-3" active>Povratak na stranicu za prijavu</Button></Link>
        </Form>
    )
};

export default connect()(withRouter(reduxForm({
    form: 'studentRegister',
    validate,
})(StudentRegisterForm)));