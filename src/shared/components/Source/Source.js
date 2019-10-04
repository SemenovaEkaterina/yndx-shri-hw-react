import React from 'react';
import {cn} from '@bem-react/classname';
import './Source.scss';
import {SourceSize} from "shared/components/Source/index";
import {Link} from "react-router-dom";

const source = cn('Source');

export default ({type, size = SourceSize.S, children, to}) => (
    <Link to={to} className={source()}>
        <div className={source('icon', {type, size})} />
        <div className={source('text')}>{children}</div>
    </Link>
)