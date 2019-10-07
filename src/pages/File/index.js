import React from 'react';
import Loadable from 'react-loadable';
import Loader from "../../shared/components/Loader";

export default Loadable({
    loader: () => import('./File'),
    loading: Loader,
});