import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import {Link} from 'react-router-dom';
import './Source.scss';

const source = cn('Source');

export enum SourceType {
  FILE = 'file',
  DIR = 'dir',
  BRANCH = 'branch',
}

export enum SourceSize {
  S = 's',
  M = 'm',
}

interface Props {
  type: SourceType;
  size: SourceSize;
  to: string;
}

const Source: FunctionComponent<Props> = ({type, size = SourceSize.S, children, to}) => (
    <Link to={to} className={source()}>
        <div className={source('icon', {type, size})} />
        <div className={source('text')}>{children}</div>
    </Link>
);

export default Source;
