import React, {Suspense, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Main, Index, File} from './pages';
const NotFound = React.lazy(() => import('./pages/NotFound'));
import Header from 'shared/components/Header';
import routes from "./routes";
import Typo from "shared/components/Typo";
import {useDispatch} from "react-redux";
import {fetchRepos} from "src/store/repos/actions";
import Loader from "shared/components/Loader";

function Root() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRepos());
    }, []);

    return (
        <Typo style="default" size="default" color="default">
            <Header/>
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route path={routes.INDEX} exact component={Index}/>
                    <Route path={routes.NOT_FOUND} exact component={NotFound}/>
                    <Route path={routes.ROOT} exact component={Main}/>
                    <Route path={routes.TREE.mask} exact component={Main}/>
                    <Route path={routes.BLOB.mask} exact component={File}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Suspense>
        </Typo>
    );
}

export default Root;
