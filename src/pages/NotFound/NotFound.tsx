import {cn} from '@bem-react/classname';
import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import routes from 'src/routes';
import { AppState } from 'src/store';
import './NotFound.scss';

const notFound = cn('NotFound');

export default () => {
    const current = useSelector((state: AppState) => state.repos.item);

    return (
        <div className='NotFound'>
            {current && <Redirect to={routes.TREE.create(current)}/>}
            <div className={notFound('text')}>Not found</div>
            <div className={notFound('code')}>404</div>
        </div>
    );
};
