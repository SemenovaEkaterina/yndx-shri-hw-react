import React from 'react';
import {cn} from '@bem-react/classname';
import './Code.scss';
import Typo from "shared/components/Typo";

const code = cn('Code');
const codeLine = cn('Code', 'line');

export default ({data = ''}) => (
    <Typo style="code">
        <div className={code()}>
            <div className={code('rows')}>
                {data.split('\n').filter(item => item).map((item, i) => (
                    <div className={code('line')}>
                        <div className={code('number')}>{i + 1}</div>
                        <div className={codeLine('text')}>
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Typo>
)