import { cn } from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import Typo, { TypoSize } from 'src/shared/components/Typo';
import './Title.scss';

const title = cn('Title');

interface Props {
  name: string;
  description?: string;
}

const Title: FunctionComponent<Props> = ({name, description}) => (
    <div className={title()}>
        <div className={title('header')}>
            <Typo size={TypoSize.TITLE}><div className={title('name')}>{name}</div></Typo>
        </div>
        {description && (
            <div className={title('body')}>
                {description}
            </div>
        )}
    </div>
);

export default Title;
