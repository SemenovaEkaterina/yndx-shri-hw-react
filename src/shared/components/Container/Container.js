import React from 'react';
import {cn} from '@bem-react/classname';
import './Container.scss';

const container = cn('Container');

export default ({children, ...props}) => (
    <div className={container(props)}>{children}</div>
);