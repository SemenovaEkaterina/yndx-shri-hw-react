import React from 'react';
import {cn} from '@bem-react/classname';
import './NotFound.scss';
import routes from "src/routes";
import {useSelector} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";

const notFound = cn('NotFound');

export default () => {
    const current = useSelector(state => state.repos.item);

    return (
        <div className="NotFound">
            {current && <Redirect to={routes.TREE.create(current)}/>}
            <div className={notFound('text')}>Not found</div>
            <div className={notFound('code')}>404</div>
        </div>
    )
};