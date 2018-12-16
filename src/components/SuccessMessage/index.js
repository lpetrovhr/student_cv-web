import React, { PropTypes } from 'react';

const success = {
    backgroundColor: '#329932',
    color: '#004000',
    margin: '5px 0 15px',
    padding: '6.5px 10px',
    textAlign: 'center',
};

const icon = {
    marginRight: 5,
};

const SuccessMessage = ({ children }) =>
    <p style={success}>
        <i style={icon} className="fa fa-check" />
        {children}
    </p>;

export default SuccessMessage;
