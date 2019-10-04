import React from 'react';
import {cn} from '@bem-react/classname';
import './Header.scss';
import Logo from "shared/components/Logo";

const header = cn('Header');
const headerItem = cn('Header', 'item');

export default () => (
    <div className={header()}>
        <div className={header('content')}>
            <div className={header('table')}>
                <a className={headerItem({type: 'logo'})}>
                    <Logo/>
                </a>
                <div className={headerItem({type: 'text', active: true})}>
                    <span className={header('dropdown')}>Repository Arc</span>
                </div>
            </div>
        </div>
    </div>
)