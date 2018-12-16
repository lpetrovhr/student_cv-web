import React, { PropTypes } from 'react';

const error = {
    backgroundColor: '#ffbbbb',
    color: '#791b23',
    margin: '5px 0 15px',
    padding: '6.5px 10px',
    textAlign: 'center',
    fontSize: '12px',
};

const ErrorMsg = ({ children }) =>
    <p style={error}>
        {children}
    </p>;
    
export default ErrorMsg;
