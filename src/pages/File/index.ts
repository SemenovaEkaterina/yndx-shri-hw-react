import Loadable from 'react-loadable';
import Loader from 'src/shared/components/Loader';

export default Loadable({
    loader: () => import('./File'),
    loading: Loader,
});