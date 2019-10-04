import React from 'react';
import {cn} from '@bem-react/classname';
import './Title.scss';
import Name from "shared/components/Name";
import Typo from "shared/components/Typo";

const title = cn('Title');

export default ({name, description}) => (
    <div className={title()}>
        <div className={title('header')}>
            <Typo size="title"><div className={title('name')}>{name}</div></Typo>
        </div>
        {description && (
            <div className={title('body')}>
                {description}
            </div>
        )}
    </div>
)