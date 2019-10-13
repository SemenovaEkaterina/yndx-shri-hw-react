import { cn } from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import Typo, {TypoStyle} from 'src/shared/components/Typo';
import './Code.scss';

const code = cn('Code');
const codeLine = cn('Code', 'line');

interface Props {
  data: string;
}

const Code: FunctionComponent<Props> = ({data}) => (
    <Typo style={TypoStyle.CODE}>
        <div className={code()}>
            <div className={code('rows')}>
                {data.split('\n').filter((item) => item).map((item, i) => (
                    <div className={code('line')} key={i}>
                        <div className={code('number')}>{i + 1}</div>
                        <div className={codeLine('text')}>
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Typo>
);

export default Code;