import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import './FileContainer.scss';

const fileContainer = cn('FileContainer');

interface Props {
  name: string;
}

const FileContainer: FunctionComponent<Props> = ({children, name}) => (
    <div className={fileContainer()}>
        <div className={fileContainer('header')}>
            <div className={fileContainer('info')}>
                <div className={fileContainer('icon')} />
                {name}
            </div>
        </div>
        {children}
    </div>
);

export default FileContainer;
