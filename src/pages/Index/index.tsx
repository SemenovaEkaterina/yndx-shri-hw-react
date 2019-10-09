import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import routes from 'src/routes';

export default () => {
    const dispatch = useDispatch();
    const storeState = useSelector((state) => state);
    useEffect(() => {
        if (!current) {
            routes.INDEX.loadData(dispatch, () => storeState);
        }
    }, []);

    const current = useSelector((state) => state.repos.item);

    return <>{current && <Redirect to={routes.TREE.create(current)}/>}</>;
};
