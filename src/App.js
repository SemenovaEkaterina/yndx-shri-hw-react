import React from 'react';
import {Provider} from 'react-redux'
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Main, File, NotFound} from './pages';
import Header from 'shared/components/Header';
import routes from "./routes";
import Typo from "shared/components/Typo";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Typo style="default" size="default" color="default">
                    <Header/>
                    <Switch>
                        <Route path={routes.ROOT} exact component={Main}/>
                        <Route path={routes.TREE.mask} exact component={Main}/>
                        <Route path={routes.BLOB.mask} exact component={File}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Typo>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
