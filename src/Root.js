import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Main, File, NotFound} from './pages';
import Header from 'shared/components/Header';
import routes from "./routes";
import Typo from "shared/components/Typo";
import {useDispatch, useSelector} from "react-redux";
import {fetchRepos} from "src/store/repos/actions";
import useParams from "shared/hooks/useParams";
import Redirect from "react-router-dom/es/Redirect";


function Root() {
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    const current = useSelector(state => state.repos.item);
    useEffect(() => {
        dispatch(fetchRepos());
    }, []);


    return (
        <Typo style="default" size="default" color="default">
            {current && repoId !== current && <Redirect to={routes.TREE.create(current)}/>}
            <Header/>
            <Switch>
                <Route path={routes.ROOT} exact component={Main}/>
                <Route path={routes.TREE.mask} exact component={Main}/>
                <Route path={routes.BLOB.mask} exact component={File}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Typo>
    );
}

export default Root;
