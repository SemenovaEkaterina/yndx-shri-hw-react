import React from 'react';
import {cn} from '@bem-react/classname';
import Typo from "shared/components/Typo";
import './Tabs.scss';

const tabs = cn('Tabs');

export default ({items = [], selected}) => (
    <div className={tabs()}>
        {items.map(item => (
            <Typo key={item} className={tabs('item', {active: item === selected})}>
                {item}
            </Typo>
        ))}
    </div>
);