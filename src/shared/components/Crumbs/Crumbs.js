import React from 'react';
import {cn} from '@bem-react/classname';
import './Crumbs.scss';
import useParams from "shared/hooks/useParams";
import routes from "src/routes";
import {Link} from "react-router-dom";

const crumbs = cn('Crumbs');

export default () => {
    const {repoId, path = ''} = useParams();
    const items = [
        {
            title: repoId,
            path: `/${repoId}`,
        },
    ].concat(path.split('/').filter(item => item).reduce((acc, cur, i) => {
        acc[i] = {
            path: !i ? cur : routes.TREE.create(repoId,`${acc[i - 1].path}/${cur}`),
            title: cur,
        };

        return acc;
    }, []));

    return (
        <div className={crumbs()}>
            {items.map(item => (
                <Link
                    to={item.path}
                    className={crumbs('item')}>
                    {item.title}
                </Link>
            ))}
        </div>
    )
};