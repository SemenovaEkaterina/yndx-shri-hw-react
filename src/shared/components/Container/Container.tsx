import {cn} from '@bem-react/classname';
import React from 'react';
import './Container.scss';

const container = cn('Container');

export default ({children, ...props}) => (
    <div className={container(props)}>{children}</div>
);