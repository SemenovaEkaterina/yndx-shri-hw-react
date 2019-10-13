import React, { FunctionComponent } from 'react';
import './Name.scss';

const Name: FunctionComponent = ({children}) => (
    <span className='Name'>{children}</span>
);

export default Name;
