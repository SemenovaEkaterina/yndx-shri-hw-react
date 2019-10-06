import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setRepo} from "src/store/repos/actions";
import routes from "src/routes";
import {Redirect} from "react-router-dom";

export default () => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos.items);
    const current = useSelector(state => state.repos.item);
    useEffect(() => {
        if (repos.length > 0) {
            dispatch(setRepo(repos[0]));
        }
    }, [repos]);
    return <>{current && <Redirect to={routes.TREE.create(current)}/>}</>;
}