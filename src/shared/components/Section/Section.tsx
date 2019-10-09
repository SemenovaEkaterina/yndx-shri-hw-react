import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import './Section.scss';

const section = cn('Section');

export enum SectionSize {
    S = 's',
    M = 'm',
    L = 'l',
}

export enum SectionMobile {
    S = 's',
}

interface Props {
    size: SectionSize;
    mobile?: SectionMobile;
}

const Section: FunctionComponent<Props> = ({children, ...props}) => (
    // TODO
    // @ts-ignore
    <div className={section(props)}>
        {children}
    </div>
);

export default Section;
