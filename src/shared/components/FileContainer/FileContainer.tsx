import React from 'react';
import {cn} from '@bem-react/classname';
import './FileContainer.scss';

const fileContainer = cn('FileContainer');

export default ({children, name}) => (
    <div className={fileContainer()}>
        <div className={fileContainer('header')}>
            <div className={fileContainer('info')}>
                <div className={fileContainer('icon')} />
                {name}
            </div>
        </div>
        {children}
    </div>
)