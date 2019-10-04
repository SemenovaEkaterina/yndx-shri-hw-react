import React from 'react';
import {cn} from '@bem-react/classname';
import './Typo.scss';

const typo = cn('Typo');

export default ({children, className, ...props}) => (
    <span className={typo(props, [className])}>{children}</span>
)