import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import './Container.scss';

const container = cn('Container');

interface Props {
  full?: boolean;
}

const Container: FunctionComponent<Props> = ({children, full = false}) => (
    <div className={container({full})}>{children}</div>
);

export default Container;
