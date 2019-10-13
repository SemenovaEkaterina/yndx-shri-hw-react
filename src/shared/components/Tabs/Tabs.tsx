import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import Typo from 'src/shared/components/Typo';
import './Tabs.scss';

const tabs = cn('Tabs');

interface Props {
    items: string[];
    selected: string;
}

const Tabs: FunctionComponent<Props> = ({items = [], selected}: Props) => (
    <div className={tabs()}>
        {items.map((item) => (
            <Typo key={item} className={tabs('item', {active: item === selected})}>
                {item}
            </Typo>
        ))}
    </div>
);

export default Tabs;
