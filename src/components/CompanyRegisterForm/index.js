import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import PrependFormInput from 'components/PrependFormInput';
import { Link } from 'react-router-dom';

import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormControl } from 'reactstrap';
import { isEmail, isPassword, isRequired, isSamePassword, isIndetificationNumber } from '../../middleware/validator';

import ErrorMsg from 'components/ErrorMessage';

export const validate = (values) => {
    const errors = {};
    const { email, password, passwordRepeat, oib, companyName, address, city } = values.toJS();

    errors.email = isRequired(email, 'hr') || isEmail(email, 'hr');
    errors.password = isRequired(password, 'hr') || isPassword(password, 'hr');
    errors.passwordRepeat = isRequired(password, 'hr') || isSamePassword(password, passwordRepeat, 'hr');
    errors.oib = isRequired(oib, 'hr') || isIndetificationNumber(oib, 'hr');
    errors.companyName = isRequired(companyName, 'hr');
    errors.address = isRequired(address, 'hr');
    errors.city = isRequired(city, 'hr');
  
    return errors;
};

const CompanyRegisterForm = props => {

    const { error, submitting, handleSubmit } = props;

    const errorMessage = error && error == "user.duplicate" ? "Korisnik sa ovom adresom elektroničke pošte već postoji." : "Došlo je do greške.";

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Registracija</h1>
            <p className="text-muted">Izradi poslovni korisnički račun</p>
            
            <Field type="text" name="companyName" placeholder="Naziv tvrtke" component={PrependFormInput} icon="briefcase" />

            <Field type="text" name="address" placeholder="Adresa" component={PrependFormInput} icon="location-pin" />
            
            <Field type="text" name="zipCode" placeholder="Grad" component={PrependFormInput} icon="directions" />
            
            <Field type="text" name="phone" placeholder="Broj telefona" component={PrependFormInput} icon="phone" />
            
            <Field type="text" name="oib" placeholder="OIB" component={PrependFormInput} symbol="OIB" />
            
            <Field type="text" name="info" placeholder="Kratki opis" component={PrependFormInput} icon="note" />
        
            <Field type="email" name="email" placeholder="E-mail" component={PrependFormInput} symbol="@" />
            
            <Field type="password" name="password" placeholder="Lozinka" component={PrependFormInput} icon="lock" />
            
            <Field type="password" name="passwordRepeat" placeholder="Ponovite lozinku" component={PrependFormInput} icon="lock" />

            {error && <ErrorMsg>{errorMessage}</ErrorMsg>}

            <Button type="submit" color="success" disabled={submitting} block>Izradi račun</Button>
            <Link to="/login"><Button style={{ width: "100%" }} color="primary" className="mt-3" active>Povratak na stranicu za prijavu</Button></Link>
        </Form>
    )
};

export default reduxForm({
    form: 'companyRegister',
    validate
})(CompanyRegisterForm);