import {cn} from '@bem-react/classname';
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import routes from 'src/routes';
import useParams from 'src/shared/hooks/useParams';
import './Crumbs.scss';

const crumbs = cn('Crumbs');

interface CrumbsParamsI {
    repoId: string;
}

export default () => {
    const {repoId} = useParams<CrumbsParamsI>();
    const path = useSelector((state) => state.files.path);

    const items = [
        {
            path: `/${repoId}`,
            title: repoId,
        },
    ].concat(path ? path.reduce((acc, cur, i) => {
        acc[i] = {
            path: !i ? routes.TREE.create(repoId, cur) : `${acc[i - 1].path}/${cur}`,
            title: cur,
        };

        return acc;
    }, []) : []);

    return (
        <div className={crumbs()}>
            {items.map((item, i) => {
                const Component = i !== items.length - 1 ? Link : 'div';
                return (
                    <Component
                        to={item.path}
                        className={crumbs('item')}>
                        {item.title}
                    </Component>
                );
            })}
        </div>
    );
};
