import React from 'react';
import {cn} from '@bem-react/classname';
import Typo from "shared/components/Typo";
import './Tabs.scss';

const tabs = cn('Tabs');

export default () => (
    <div className={tabs()}>
        <Typo className={tabs('item', {active: true})}>
            FILES
        </Typo>
    </div>
);