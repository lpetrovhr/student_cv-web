import React, { PropTypes } from 'react';
import { Input } from 'reactstrap';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, InputGroup, InputGroupAddon, InputGroupText, Form, FormGroup, FormControl } from 'reactstrap';
import ErrorMessage from 'components/ErrorMessage';

const PrependFormInput = props => {
    const { input, icon, symbol, meta: { active, touched, error }, ...other } = props;

    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {icon ? <i className={`icon-${icon}`}></i> : symbol}
                    </InputGroupText>
                </InputGroupAddon>
                <Input id={input.name} {...input} {...other} />
            </InputGroup>
            {!active && touched && error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
    );
};

export default PrependFormInput;
