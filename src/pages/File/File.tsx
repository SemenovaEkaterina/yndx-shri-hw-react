import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from 'src/routes';
import Code from 'src/shared/components/Code';
import Container from 'src/shared/components/Container';
import Crumbs from 'src/shared/components/Crumbs';
import FileContainer from 'src/shared/components/FileContainer';
import Loader from 'src/shared/components/Loader/Loader';
import Section, {
    SectionMobile,
    SectionSize,
} from 'src/shared/components/Section/Section';
import Tabs from 'src/shared/components/Tabs/Tabs';
import Title from 'src/shared/components/Title';
import useParams from 'src/shared/hooks/useParams';
import { fetchFile } from 'src/store/files/actions';
import { SourceStatus } from 'src/store/types';

export default () => {
    // TODO часть с вызовом loadData для текущего рута частично дублируется на страницах -> сделать универсально
    const dispatch = useDispatch();
    const {repoId, path} = useParams();
    const storeState = useSelector((state) => state);
    const files = useSelector((state) => state.files);
    useEffect(() => {
        if (files.itemStatus === SourceStatus.INITIAL) {
            routes.BLOB.loadData(dispatch, () => storeState, {repoId, path});
        }
    }, []);

    useEffect(() => {
        dispatch(fetchFile(repoId, path));
    }, [path]);

    const file = useSelector((state) => state.files.item);
    const status = useSelector((state) => state.files.itemStatus);
    const name = useSelector((state) => state.files.name);
    const current = useSelector((state) => state.repos.item);

    return (
        <>
            {status === SourceStatus.NOT_FOUND && <Redirect to={routes.NOT_FOUND.create()}/>}
            {repoId !== current && <Redirect to={routes.TREE.create(repoId)}/>}
            {status === SourceStatus.LOADING && <Loader/>}
            {status === SourceStatus.SUCCESS && (
                <>
                    <Container>
                        <Crumbs/>
                        <Section size={SectionSize.L}>
                            <Tabs items={['details']} selected={'details'}/>
                        </Section>
                        <Section size={SectionSize.M}>
                            <Title name={name}/>
                        </Section>
                    </Container>
                    <Container full>
                        <Section size={SectionSize.M} mobile={SectionMobile.S}>
                            <FileContainer name={name}>
                                <Code data={file}/>
                            </FileContainer>
                        </Section>
                    </Container>
                </>
            )}
        </>
    );
};
