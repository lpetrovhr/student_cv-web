import React, { PropTypes } from 'react';
import { Input } from 'reactstrap';

const FormInput = props => {
    const { input, meta: { active, touched, error }, ...other } = props;

    return (
        <p>
            <Input key={input.name} id={input.name} {...input} {...other} />
            {!active && touched && error && <span>{error}</span>}
        </p>
        
    );
};

export default FormInput;
