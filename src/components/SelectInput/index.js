import React, { PropTypes } from 'react';
import { Input } from 'reactstrap';

const FormInput = props => {
    const { input, data, defaultHolder, meta: { active, touched, error }, ...other } = props;
    return (
        <p>
            <Input type="select" key={input.name} id={input.name} {...input} {...other}>
                <option value="">{defaultHolder}</option>
                {data ? data.map(type =>
                    <option value={type.id} key={type.id}>{type.name}</option>
                ) : ""}
            </Input>
            {!active && touched && error && <span>{error}</span>}
        </p>

    );
};

export default FormInput;
