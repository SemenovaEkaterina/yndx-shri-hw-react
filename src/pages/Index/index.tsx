import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import routes from 'src/routes';
import { AppState } from '../../store';

export default () => {
    const dispatch = useDispatch();
    const storeState = useSelector((state: AppState) => state);
    useEffect(() => {
        if (!current) {
            routes.INDEX.loadData(dispatch, () => storeState);
        }
    }, []);

    const current = useSelector((state: AppState) => state.repos.item);

    return <>{current && <Redirect to={routes.TREE.create(current)}/>}</>;
};
