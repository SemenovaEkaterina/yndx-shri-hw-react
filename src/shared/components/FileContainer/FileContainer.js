import React from 'react';
import {cn} from '@bem-react/classname';
import './FileContainer.scss';

const fileContainer = cn('FileContainer');

export default ({children}) => (
    <div className={fileContainer()}>
        <div className={fileContainer('header')}>
            <div className={fileContainer('info')}>
                <div className={fileContainer('icon')} />
                ya.make <span className="FileContainer-size">(4 347 bytes)</span>
            </div>
            <div className={fileContainer('actions')}>
                <div className={fileContainer('link', {type: 'save'})} />
            </div>
        </div>
        {children}
    </div>
)