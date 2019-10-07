import React, {Suspense, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Main, Index, File, NotFound} from './pages';
import Header from 'shared/components/Header';
import routes from "./routes";
import Typo from "shared/components/Typo";
import {useDispatch} from "react-redux";
import {fetchRepos} from "src/store/repos/actions";

function Root() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRepos());
    }, []);

    return (
        <Typo style="default" size="default" color="default">
            <Header/>
            <Switch>
                <Route path={routes.INDEX.path} exact component={Index}/>
                <Route path={routes.NOT_FOUND.path} exact component={NotFound}/>
                <Route path={routes.ROOT.path} exact component={Main}/>
                <Route path={routes.TREE.path} exact component={Main}/>
                <Route path={routes.BLOB.path} exact component={File}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Typo>
    );
}

export default Root;
