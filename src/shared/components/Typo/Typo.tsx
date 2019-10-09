import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import './Typo.scss';

const typo = cn('Typo');

export enum TypoSize {
  DEFAULT = 'default',
  TITLE = 'title',
}

export enum TypoStyle {
  DEFAULT = 'default',
  CODE = 'code',
}

export enum TypoColor {
  DEFAULT = 'default',
  INACTIVE = 'inactive',
  ADDITIONAL = 'additional',
  ACCENT = 'accent',
}

interface Props {
  className?: string;
  size?: TypoSize;
  style?: TypoStyle;
  color?: TypoColor;
}

const Typo: FunctionComponent<Props> = ({children, className, ...props}) => (
    // TODO
    // @ts-ignore
    <span className={typo(props, [className])}>{children}</span>
);

export default Typo;
