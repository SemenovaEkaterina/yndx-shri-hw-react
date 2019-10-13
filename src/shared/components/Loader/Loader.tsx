import {cn} from '@bem-react/classname';
import React from 'react';
import './Loader.scss';

const loader = cn('Loader');

export default () => (
    <div className={loader()}>
        <div className={loader('spin')} />
    </div>
)