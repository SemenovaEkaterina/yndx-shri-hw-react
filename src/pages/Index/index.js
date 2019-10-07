import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import routes from "src/routes";
import {Redirect} from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    useEffect(() => {
        if (!current) {
            routes.INDEX.loadData(dispatch, () => state)
        }
    }, []);

    const current = useSelector(state => state.repos.item);

    return <>{current && <Redirect to={routes.TREE.create(current)}/>}</>;
}