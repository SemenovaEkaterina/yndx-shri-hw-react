import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Header from 'src/shared/components/Header';
import Typo from 'src/shared/components/Typo';
import {fetchRepos} from 'src/store/repos/actions';
import {File, Index, Main, NotFound} from './pages';
import routes from './routes';
import { TypoColor, TypoSize, TypoStyle } from './shared/components/Typo/Typo';

function Root() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRepos());
    }, []);

    return (
        <Typo style={TypoStyle.DEFAULT} size={TypoSize.DEFAULT} color={TypoColor.DEFAULT}>
            <Header/>
            <Switch>
                <Route path={routes.INDEX.path} exact component={Index}/>
                <Route path={routes.NOT_FOUND.path} exact component={NotFound}/>
                <Route path={routes.ROOT.path} exact component={Main}/>
                <Route path={routes.TREE.path} exact component={Main}/>
                <Route path={routes.BLOB.path} exact component={File}/>
                <Route path='*' component={NotFound}/>
            </Switch>
        </Typo>
    );
}

export default Root;
