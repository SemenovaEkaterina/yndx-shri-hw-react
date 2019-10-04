import React from 'react';
import {cn} from '@bem-react/classname';
import './Section.scss';

const section = cn('Section');

export default ({children, ...props}) => (
    <div className={section(props)}>
        {children}
    </div>
)