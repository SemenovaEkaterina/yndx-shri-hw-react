import React from 'react';
import {cn} from '@bem-react/classname';
import './Crumbs.scss';
import useParams from "shared/hooks/useParams";
import routes from "src/routes";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const crumbs = cn('Crumbs');

export default () => {
    const {repoId} = useParams();
    const path = useSelector(state => state.files.path) || [];

    console.log(path);

    const items = [
        {
            title: repoId,
            path: `/${repoId}`,
        },
    ].concat(path.reduce((acc, cur, i) => {
        acc[i] = {
            path: routes.TREE.create(repoId,`${!i ? cur : (acc[i - 1].path + '/' + cur)}`),
            title: cur,
        };

        return acc;
    }, []));

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
                )
            })}
        </div>
    )
};