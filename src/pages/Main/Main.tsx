import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from 'src/routes';
import Container from 'src/shared/components/Container';
import Crumbs from 'src/shared/components/Crumbs';
import Loader from 'src/shared/components/Loader';
import Section, { SectionSize } from 'src/shared/components/Section';
import Tabs from 'src/shared/components/Tabs';
import useParams from 'src/shared/hooks/useParams';
import { AppState } from 'src/store';
import { fetchFiles, setPath } from 'src/store/files/actions';
import { SourceStatus } from 'src/store/types';
import FilesTable from './FilesTable';
import FilesTitle from './FilesTitle';

export default () => {
    // TODO часть с вызовом loadData для текущего рута частично дублируется на страницах -> сделать универсально
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    const storeState = useSelector((state: AppState) => state);
    useEffect(() => {
        if (storeState.files.status === SourceStatus.INITIAL) {
            routes.TREE.loadData(dispatch, () => storeState, {repoId, path});
        } else {
            dispatch(setPath(path));
        }
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            dispatch(fetchFiles(repoId!, path));
        }
    }, [path, repoId]);

    const status = useSelector((state: AppState) => state.files.status);
    const current = useSelector((state: AppState) => state.repos.item);

    return (
        <>
            {status === SourceStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND.create()}/>}
            {status === SourceStatus.LOADING && <Loader/>}
            {status === SourceStatus.SUCCESS && (
                <>
                    {current !== repoId && <Redirect to={routes.TREE.create(current!)}/>}
                    <div className='Main'>
                        <Container>
                            <Crumbs/>
                            <FilesTitle/>
                            <Section size={SectionSize.L}>
                                <Tabs items={['files']} selected={'files'}/>
                            </Section>
                            <FilesTable/>
                        </Container>
                    </div>
                </>
            )}
        </>
    );
};
