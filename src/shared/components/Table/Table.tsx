import React from 'react';
import {cn} from '@bem-react/classname';
import './Table.scss';

const table = cn('Table');
const tableRow = cn('Table', 'row');
const tableCol = cn('Table', 'col');

export default props => {
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
}