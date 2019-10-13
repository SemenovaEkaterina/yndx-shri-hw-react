import {cn} from '@bem-react/classname';
import React, { FunctionComponent } from 'react';
import './Table.scss';

const table = cn('Table');
const tableRow = cn('Table', 'row');
const tableCol = cn('Table', 'col');

interface Props {
  data: {
    names: Array<{title: string, key: string}>;
    values: Array<{[key: string]: React.ReactNode}>;
  };
}

const Table: FunctionComponent<Props> = (props: Props) => {
    const { data: {names, values} } = props;

    return (
        <div className={table()}>
            <div className={tableRow({type: 'header'})}>
                {names.map((item, i) => <div className={tableCol()} key={i}>{item.title}</div>)}
            </div>
            {values.map((value, i) => (
                <div key={i} className={tableRow({type: 'content'})}>
                    {names.map((item, i) => <div key={i} className={tableCol()}>{value[item.key]}</div>)}
                </div>
            ))}
        </div>
    );
};

export default Table;
